---
id: assertions
title: "Assertions"
---

The Playwright API can be used to read element contents and properties for test assertions. These values are fetched from the browser page and asserted in Node.js.

- [Common patterns](#common-patterns)
- [Element Handles](#element-handles)
- [Custom assertions](#custom-assertions)

## Common patterns

Playwright provides convenience APIs for common assertion tasks, like finding the text content of an element. These APIs require a [selector](./selectors.md) to locate the element.

```js
// This example uses the Node.js's built-in `assert` module,
// but any assertion library (Expect, Chai, etc.) will work.

// Assert text content
const content = await page.textContent('nav:first-child');
assert(content === 'home');

// Assert inner text
const text = await page.innerText('.selected');
assert(text === 'value');

// Assert inner HTML
const html = await page.innerHTML('div.result');
assert(html === '<p>Result</p>')

// Assert `checked` attribute
const checked = await page.getAttribute('input', 'checked');
assert(checked);
```

#### API reference
- [page.text_content(selector, **options)](./api/class-page.md#pagetextcontentselector-options)
- [page.inner_text(selector, **options)](./api/class-page.md#pageinnertextselector-options)
- [page.inner_html(selector, **options)](./api/class-page.md#pageinnerhtmlselector-options)
- [page.get_attribute(selector, name, **options)](./api/class-page.md#pagegetattributeselector-name-options)
- [frame.text_content(selector, **options)](./api/class-frame.md#frametextcontentselector-options)
- [frame.inner_text(selector, **options)](./api/class-frame.md#frameinnertextselector-options)
- [frame.inner_html(selector, **options)](./api/class-frame.md#frameinnerhtmlselector-options)
- [frame.get_attribute(selector, name, **options)](./api/class-frame.md#framegetattributeselector-name-options)

<br/>

## Element Handles

[ElementHandle] objects represent in-page DOM elements. They can be used to assert for multiple properties of the element.

It is recommended to fetch the [ElementHandle] object with [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options) or [frame.wait_for_selector(selector, **options)](./api/class-frame.md#framewaitforselectorselector-options). These APIs wait for the element to be visible and then return an `ElementHandle`.

```js
// Get the element handle
const elementHandle = page.waitForSelector('#box');

// Assert bounding box for the element
const boundingBox = await elementHandle.boundingBox();
assert(boundingBox.width === 100);

// Assert attribute for the element
const classNames = await elementHandle.getAttribute('class');
assert(classNames.includes('highlighted'));
```

#### API reference
- [element_handle.text_content()](./api/class-elementhandle.md#elementhandletextcontent)
- [element_handle.inner_text()](./api/class-elementhandle.md#elementhandleinnertext)
- [element_handle.inner_html()](./api/class-elementhandle.md#elementhandleinnerhtml)
- [element_handle.get_attribute(name)](./api/class-elementhandle.md#elementhandlegetattributename)
- [element_handle.bounding_box()](./api/class-elementhandle.md#elementhandleboundingbox)

<br/>

## Custom assertions

With Playwright, you can also write custom JavaScript to run in the context of the browser. This is useful in situations where you want to assert for values that are not covered by the convenience APIs above.

The following APIs do not auto-wait for the element. It is recommended to use [page.wait_for_selector(selector, **options)](./api/class-page.md#pagewaitforselectorselector-options) or [frame.wait_for_selector(selector, **options)](./api/class-frame.md#framewaitforselectorselector-options).

```js
// Assert local storage value
const userId = page.evaluate(() => window.localStorage.getItem('userId'));
assert(userId);

// Assert value for input element
await page.waitForSelector('#search');
const value = await page.$eval('#search', el => el.value);
assert(value === 'query');

// Assert computed style
const fontSize = await page.$eval('div', el => window.getComputedStyle(el).fontSize);
assert(fontSize === '16px');

// Assert list length
const length = await page.$$eval('li.selected', (items) => items.length);
assert(length === 3);
```

#### API reference
- [page.evaluate(page_function, **options)](./api/class-page.md#pageevaluatepagefunction-options)
- [page.$eval(selector, page_function, **options)](./api/class-page.md#pageevalselector-pagefunction-options)
- [page.$$eval(selector, page_function, **options)](./api/class-page.md#pageevalselector-pagefunction-options-1)
- [frame.evaluate(page_function, **options)](./api/class-frame.md#frameevaluatepagefunction-options)
- [frame.$eval(selector, page_function, **options)](./api/class-frame.md#frameevalselector-pagefunction-options)
- [frame.$$eval(selector, page_function, **options)](./api/class-frame.md#frameevalselector-pagefunction-options-1)
- [element_handle.$eval(selector, page_function, **options)](./api/class-elementhandle.md#elementhandleevalselector-pagefunction-options)
- [element_handle.$$eval(selector, page_function, **options)](./api/class-elementhandle.md#elementhandleevalselector-pagefunction-options-1)
- [EvaluationArgument]

[Accessibility]: ./api/class-accessibility.md "Accessibility"
[Browser]: ./api/class-browser.md "Browser"
[BrowserContext]: ./api/class-browsercontext.md "BrowserContext"
[BrowserType]: ./api/class-browsertype.md "BrowserType"
[CDPSession]: ./api/class-cdpsession.md "CDPSession"
[ChromiumBrowserContext]: ./api/class-chromiumbrowsercontext.md "ChromiumBrowserContext"
[ConsoleMessage]: ./api/class-consolemessage.md "ConsoleMessage"
[Dialog]: ./api/class-dialog.md "Dialog"
[Download]: ./api/class-download.md "Download"
[ElementHandle]: ./api/class-elementhandle.md "ElementHandle"
[FileChooser]: ./api/class-filechooser.md "FileChooser"
[FirefoxBrowser]: ./api/class-firefoxbrowser.md "FirefoxBrowser"
[Frame]: ./api/class-frame.md "Frame"
[JSHandle]: ./api/class-jshandle.md "JSHandle"
[Keyboard]: ./api/class-keyboard.md "Keyboard"
[Mouse]: ./api/class-mouse.md "Mouse"
[Page]: ./api/class-page.md "Page"
[Playwright]: ./api/class-playwright.md "Playwright"
[Request]: ./api/class-request.md "Request"
[Response]: ./api/class-response.md "Response"
[Route]: ./api/class-route.md "Route"
[Selectors]: ./api/class-selectors.md "Selectors"
[TimeoutError]: ./api/class-timeouterror.md "TimeoutError"
[Touchscreen]: ./api/class-touchscreen.md "Touchscreen"
[Video]: ./api/class-video.md "Video"
[WebKitBrowser]: ./api/class-webkitbrowser.md "WebKitBrowser"
[WebSocket]: ./api/class-websocket.md "WebSocket"
[Worker]: ./api/class-worker.md "Worker"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Evaluation Argument]: ./core-concepts.md#evaluationargument "Evaluation Argument"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"

[Any]: https://docs.python.org/3/library/typing.html#typing.Any "Any"
[bool]: https://docs.python.org/3/library/stdtypes.html "bool"
[Callable]: https://docs.python.org/3/library/typing.html#typing.Callable "Callable"
[Dict]: https://docs.python.org/3/library/typing.html#typing.Dict "Dict"
[float]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "float"
[int]: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "int"
[List]: https://docs.python.org/3/library/typing.html#typing.List "List"
[NoneType]: https://docs.python.org/3/library/constants.html#None "None"
[pathlib.Path]: https://realpython.com/python-pathlib/ "pathlib.Path"
[str]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
[Union]: https://docs.python.org/3/library/typing.html#typing.Union "Union"