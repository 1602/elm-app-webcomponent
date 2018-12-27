## Build web-component using create-elm-app

### Installation

1. add this plugin as a development dependency of a project you created with `create-elm-app`

```
yarn add -D elm-app-webcomponent
```

2. use plugin in `elmapp.config.js`

```javascript
exports.configureWebpack = require('elm-app-webcomponent');
```

### Usage

1. You need to create an entry point for your web component in `src/custom-element.js`,
this is a boilerplate you might want to start with:


```javascript
const Elm = require('./Main');
const css = require('./main.css').toString();

customElements.define('my-webcomponent',
    class extends HTMLElement {

        constructor() {
            super();

            const appRoot = document.createElement('div');
            const appStyles = document.createElement('style');
            appStyles.textContent = css;

            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(appStyles);
            shadowRoot.appendChild(appRoot);
            this.appRoot = appRoot;
        }

        connectedCallback() {
            const app = Elm.Elm.Main.init({ node: this.appRoot });
            this.app = app;
        }
});
```

2. Run `elm-app build` as usual to build your web component.
