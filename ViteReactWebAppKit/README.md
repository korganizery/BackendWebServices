# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Folder Structure
```shell
Folder Structure
Directory Structure
We have generated a complete development framework for you, providing a wide range of functions and pitfalls for middle and back-end development. Below is the directory structure of the entire project. 
├── config                   # config, including routing, building, etc.
├── mock                     # local mock data
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # local static resources
│   ├── components           # business common components
│   ├── e2e                  # integration test cases
│   ├── layouts              # common layout
│   ├── models               #  model global model
│   ├── pages                # business page entry and common templates
│   ├── services             # backend interface service
│   ├── utils                # utility library
│   ├── locales              # internationalization resources
│   ├── global.less          # global style
│   └── global.ts            # global JS
├── tests                    # test tools
├── README.md
└── package.json
Page code structure recommendation
To organize project code more easily, we have defined a set of recommendations for organizing project code. This is a recommendation for organizing project code to make it easier for developers to locate related page component code. It is not mandatory.

src
├── components
└── pages
    ├── Welcome        // Route component should not contain other route components. Based on this convention, it is easy to distinguish between route components and non-route components.
    |   ├── components // For complex pages, you can do more in-depth organization, but it is recommended not to exceed three layers.
    |   ├── Form.tsx
    |   ├── index.tsx  // Page component code
    |   └── index.less // Page style
    ├── Order          // Route component should not contain other route components. Based on this convention, it is easy to distinguish between route components and non-route components.
    |   ├── index.tsx
    |   └── index.less
    ├── User
    |   ├── components // Common components in the group
    |   ├── Login      // Page in the group Login
    |   ├── Register   // Page in the group Register
    |   └── util.ts    // Here you can have some common methods, etc. It is not recommended or constrained, and you can organize it according to your business scenario.
    └── *              // other page component code
All route components (components configured in the routing configuration) are recommended to be named in camel case and placed at the first level of pages (complex projects can add a group level, place pages under group). It is not recommended to nest route components inside a route component - it is not easy to distinguish whether a component is a route component, and it is not easy to quickly locate a route component from the global.

We recommend splitting route components into more granular components as much as possible. For components that may be used by multiple pages, we recommend placing them in src/components. For components that are only dependent on a single page (blocks), we recommend maintaining them in the route component folder.
```
