# Typescript ES6 Module Template

This template can be used to create a browser compatible es6 module using **only** typescript: no bundler is included or required.

A unit test framework: Karma Runner with Jasmine assertions, as well as a documentation system: typedoc, are also included.

## Usage

See a list of npm commands defined:

1. `npm test` - run the unit tests with coverage reports available in the `coverage` folder.
2. `npm run build.doc` - build the documentation and populate the `docs` folder.
3. `npm run build.lib` - build the library and copy the library to the `lib` folder.

## Demo

This template includes a calculator module that has been added into the `index.js` file in the `demo` folder. To run the demo, open the `index.html` file in the `demo` folder in a browser and inspect the console out.

## Import Maps

Typically you would use a bundler like webpack to bundle your typescript files into a single file with all dependencies included and references resolved correctly. However, this template leverages the newly browser supported import maps to defined and resolve references without the need to add an additional build step.

By using import maps you can define different module resolution pathways depending on your workflow. For example, when using the modules in production import maps can point to a CDN while during development import maps can be configured to point to locally installed npm packages or file in the `src` folder. See the `index.html` file in the `demo` folder for an example of how to configure import maps. Also, see the `importmap.js` file in the root directory where import maps for local development and testing is defined. Both the `karma.conf.js` and `wallaby.js` configuration files use the `importmap.js` file to inject the import maps into the test environment. Also, to keep VS Code typescript language server happy, the compiler paths options are added to `build.test.json` and `build.lib.json` files.

Lastly, given this template is updated and published to npm, when the user runs `npm install <package-name>`, import maps will automatically get injected into the `index.html`. The automatically injected import maps will point to the package in the `node_module` directory where all node package are installed by default.
