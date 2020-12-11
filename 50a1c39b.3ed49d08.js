(window.webpackJsonp=window.webpackJsonp||[]).push([[269],{326:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),i=(n(0),n(866)),o={id:"intro",title:"Getting Started"},s={unversionedId:"intro",id:"version-1.1.0/intro",isDocsHomePage:!1,title:"Getting Started",description:"- Installation",source:"@site/versioned_docs/version-1.1.0/intro.md",slug:"/intro",permalink:"/docs/1.1.0/intro",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/versioned_docs/version-1.1.0/intro.md",version:"1.1.0",sidebar:"version-1.1.0/docs",next:{title:"Core concepts",permalink:"/docs/1.1.0/core-concepts"}},c=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]},{value:"First script",id:"first-script",children:[]},{value:"System requirements",id:"system-requirements",children:[]},{value:"Debugging scripts",id:"debugging-scripts",children:[]}],l={rightToc:c};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#installation"}),"Installation")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#usage"}),"Usage")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#first-script"}),"First script")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#system-requirements"}),"System requirements")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"#debugging-scripts"}),"Debugging scripts"))),Object(i.b)("br",null),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("p",null,"Use npm or Yarn to install Playwright in your Node.js project. Playwright requires Node.js 10 or higher."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"npm i -D playwright\n")),Object(i.b)("p",null,"During installation, Playwright downloads browser binaries for Chromium, Firefox and WebKit. This sets up your environment for browser automation with just one command. It is possible to modify this default behavior for monorepos and other scenarios. See ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/1.1.0/installation"}),"installation parameters")," for mode details."),Object(i.b)("br",null),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"Once installed, you can ",Object(i.b)("inlineCode",{parentName:"p"},"require")," Playwright in a Node.js script, and launch any of the 3 browsers (",Object(i.b)("inlineCode",{parentName:"p"},"chromium"),", ",Object(i.b)("inlineCode",{parentName:"p"},"firefox")," and ",Object(i.b)("inlineCode",{parentName:"p"},"webkit"),")."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const { chromium } = require('playwright');\n\n(async () => {\n  const browser = await chromium.launch();\n  // Create pages, interact with UI elements, assert values\n  await browser.close();\n})();\n")),Object(i.b)("p",null,"Playwright APIs are asynchronous and return Promise objects. Our code examples use ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await"}),"the async/await pattern")," to simplify comprehension. The code is wrapped in an unnamed async arrow function which is invoking itself."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"(async () => { // Start of async arrow function\n  // Function code\n  // ...\n})(); // End of the function and () to invoke itself\n")),Object(i.b)("br",null),Object(i.b)("h2",{id:"first-script"},"First script"),Object(i.b)("p",null,"In our first script, we will navigate to ",Object(i.b)("inlineCode",{parentName:"p"},"whatsmyuseragent.org")," and take a screenshot in WebKit."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const { webkit } = require('playwright');\n\n(async () => {\n  const browser = await webkit.launch();\n  const page = await browser.newPage();\n  await page.goto('http://whatsmyuseragent.org/');\n  await page.screenshot({ path: `example.png` });\n  await browser.close();\n})();\n")),Object(i.b)("p",null,"By default, Playwright runs the browsers in headless mode. To see the browser UI, pass the ",Object(i.b)("inlineCode",{parentName:"p"},"headless: false")," flag while launching the browser. You can also use ",Object(i.b)("inlineCode",{parentName:"p"},"slowMo")," to slow down execution."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"firefox.launch({ headless: false, slowMo: 50 });\n")),Object(i.b)("br",null),Object(i.b)("h2",{id:"system-requirements"},"System requirements"),Object(i.b)("p",null,"Playwright requires Node.js version 10.15 or above. The browser binaries for Chromium,\nFirefox and WebKit work across the 3 platforms (Windows, macOS, Linux):"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Windows"),": Works with Windows and Windows Subsystem for Linux (WSL)."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"macOS"),": Requires 10.14 or above."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Linux"),": Depending on your Linux distribution, you might need to install additional\ndependencies to run the browsers.",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"For Ubuntu 18.04, the additional dependencies are defined in ",Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"docker/Dockerfile.bionic"}),"our Docker image"),",\nwhich is based on Ubuntu.")))),Object(i.b)("br",null),Object(i.b)("h2",{id:"debugging-scripts"},"Debugging scripts"),Object(i.b)("p",null,"Playwright scripts can be developed just like any other Node.js script. For example, you can use the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://nodejs.org/api/debugger.html"}),"Node.js debugger")," or ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://code.visualstudio.com/docs/nodejs/nodejs-debugging"}),"VS Code debugging")," to set breakpoints and get fine grained control over execution."),Object(i.b)("a",{href:"https://user-images.githubusercontent.com/284612/77234134-5f21a500-6b69-11ea-92ec-1c146e1333ec.png"},Object(i.b)("img",{src:"https://user-images.githubusercontent.com/284612/77234134-5f21a500-6b69-11ea-92ec-1c146e1333ec.png",width:"300",alt:"Chromium Developer Tools"})),Object(i.b)("p",null,"It is also possible to open ",Object(i.b)("strong",{parentName:"p"},"browser developer tools")," during execution, to inspect the DOM tree or network activity."),Object(i.b)("br",null))}b.isMDXComponent=!0},866:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),b=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=b(n),d=r,m=u["".concat(o,".").concat(d)]||u[d]||p[d]||i;return n?a.a.createElement(m,s(s({ref:t},l),{},{components:n})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);