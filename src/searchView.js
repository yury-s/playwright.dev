// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {html} from './zhtml.js';
import {FuzzySearch} from './fuzzy.js';
import {onDOMEvent, consumeDOMEvent, disposeAll} from './utils.js';
import {scrollIntoView} from './third_party/scroll-into-view-if-needed.js';

// Number of suggestions to render immediately.
const INSTANT_RENDER_COUNT = 30;

export class SearchView {
  constructor() {
    this.element = html`
      <input type=search autocomplete=off autocapitalize=off spellcheck=false size=1 placeholder='start typing to search...'></input>
    `;
    this._suggestionsElement = html`<search-suggestions></search-suggestions>`;
    this._selectedSearchItem = null;

    this._glossaryItems = null;
    this._homeURL = null;
    this._originalInputValue = '';
    this._eventListeners = [
      onDOMEvent(this.element, 'focus', () => this._originalInputValue = this.element.value),
      onDOMEvent(this.element, 'input', () => this._doSearch(this.element.value)),
      onDOMEvent(this.element, 'keydown', this._onInputKeydown.bind(this)),
    ];
  }

  inputElement() {
    return this.element;
  }

  _onInputKeydown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      consumeDOMEvent(event);
      this.element.value = this._originalInputValue;
      this.element.blur();
      this._hideSuggestions();
    } else if (event.key === 'Enter') {
      if (this._selectedSearchItem) {
        this._selectedSearchItem.click();
      }
    } else if (event.key === 'ArrowDown') {
      this._selectNext(event);
    } else if (event.key === 'ArrowUp') {
      this._selectPrevious(event);
    }
  }

  _selectNext(event) {
    if (!this._selectedSearchItem)
      return;
    consumeDOMEvent(event);
    let next = this._selectedSearchItem.nextSibling;
    if (!next)
      next = this._suggestionsElement.firstChild;
    this._selectElement(next);
  }

  _selectPrevious(event) {
    if (!this._selectedSearchItem)
      return;
    event.preventDefault();
    let previous = this._selectedSearchItem.previousSibling;
    if (!previous)
      previous = this._suggestionsElement.lastChild;
    this._selectElement(previous);
  }

  _selectElement(item) {
    if (this._selectedSearchItem)
      this._selectedSearchItem.classList.remove('selected');
    this._selectedSearchItem = item;
    if (this._selectedSearchItem) {
      this._selectedSearchItem.classList.add('selected');
      scrollIntoView(this._selectedSearchItem, { block: 'nearest', behavior: 'instant', scrollMode: 'if-needed' });
    }
  }

  setGlossary(glossaryItems) {
    this._hideSuggestions();
    this._glossaryItems = glossaryItems.filter(item => item.searchable());
  }

  setHomeURL(homeURL) {
    this._homeURL = homeURL;
  }

  setDocumentation(documentation) {
    this._hideSuggestions();
    this._documentation = documentation;
  }

  _hideSuggestions() {
    if (!this._suggestionsElement.isConnected)
      return;
    this._suggestionsElement.remove();
  }

  _doSearch(query) {
    if (!this._glossaryItems)
      return;
    const suggestions = [];
    if (query) {
      const fuzzySearch = new FuzzySearch(query);
      for (const item of this._glossaryItems) {
        const {score, matchIndexes} = fuzzySearch.score(item.name());
        if (score > 0) {
          suggestions.push({
            name: item.name(),
            description: item.description(),
            url: item.url(),
            score,
            matchIndexes
          });
        }
      }
      suggestions.sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (scoreDiff)
          return scoreDiff;
        // Prefer left-most search results.
        const startDiff = a.matchIndexes[0] - b.matchIndexes[0];
        if (startDiff)
          return startDiff;
        return a.name.length - b.name.length;
      });
    } else {
      suggestions.push(...this._glossaryItems.map(item => ({
        name: item.name(),
        description: item.description(),
        url: item.url(),
        score: 0,
        matchIndexes: [],
      })));
    }

    this._suggestionsElement.textContent = '';
    if (!this._suggestionsElement.isConnected)
      document.body.append(this._suggestionsElement);
    if (suggestions.length === 0) {
      this._suggestionsElement.append(html`<a class="search-item text-only">No Results</a>`);
      return;
    }

    const renderItem = item => html`
      <a class="search-item ${item.description ? '' : 'name-only'}" href="${item.url}">
        <search-name>${renderSearchItemName(item.name, item.matchIndexes)}</search-name>
        ${item.description && html`<search-description>${item.description}</search-description>`}
      </a>
    `;

    if (!query.trim().length && this._homeURL)
      this._suggestionsElement.append(html`<a class="search-item text-only" href="${this._homeURL}">Home</a>`);
    this._suggestionsElement.append(...suggestions.slice(0, INSTANT_RENDER_COUNT).map(renderItem));
    this._selectElement(this._suggestionsElement.firstChild);
    const leftovers = suggestions.slice(INSTANT_RENDER_COUNT);
    if (leftovers.length) {
      const leftoversElement = html`
        <a class="search-item text-only">
          Show Remainig ${leftovers.length} Results.
        </a>
      `;
      onDOMEvent(leftoversElement, 'click', () => {
        leftoversElement.remove();
        this._suggestionsElement.append(...leftovers.map(renderItem));
      });
      this._suggestionsElement.append(leftoversElement);
    }
  }

  dispose() {
    disposeAll(this._eventListeners);
  }
}

function renderSearchItemName(name, matchIndexes) {
  const dotIndex = name.indexOf('.');
  const indexes = new Set(matchIndexes);
  let lastGroup = {
    isMethodName: false,
    isHighlighted: false,
    fromIndex: 0,
    toIndex: 0,
  };
  const groups = [lastGroup];
  for (let i = 0; i < name.length; ++i) {
    const isMethodName = i < dotIndex;
    const isHighlighted = indexes.has(i);
    if (lastGroup.isMethodName !== isMethodName || lastGroup.isHighlighted !== isHighlighted) {
      lastGroup.toIndex = i;
      lastGroup = {
        isMethodName, isHighlighted, fromIndex: i
      };
      groups.push(lastGroup);
    }
  }
  lastGroup.toIndex = name.length;
  return html`${groups.map(group => html`
    <span class="${group.isMethodName ? 'method-name' : ''} ${group.isHighlighted ? 'highlight': ''}">
      ${name.substring(group.fromIndex, group.toIndex)}
    </span>
  `)}`;
}