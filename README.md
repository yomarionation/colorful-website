# colorful-website

The `main` branch holds the latest stable version of the source code.

The `production` branch is deployed automatically to https://sunday-afternoon-design.github.io/colorful-website/ via GitHub Pages upon merge.

## build

We use https://vitejs.dev/ to build the code.

Some three.js specific files can't be included in the build via regular import and are referenced in the code as static files. Info about these files here: https://threejs.org/docs/#examples/en/loaders/DRACOLoader and here: https://threejs.org/docs/#manual/en/introduction/Installation, under "Addons".

These files live in the `public` folder. The build process copies them over to the root of the `dist` folder, used as the prod root.

The line `dracoLoader.setDecoderPath('xxx');` sets `'xxx'` as the path to these files. These two options use the same path for dev and prod environments:
- put the files in `public` and set `''` as the path
- put the files in `public/draco` and set `'./draco/'` as the path — NB: this seems to go against the vite guidelines, see https://vitejs.dev/guide/assets.html#the-public-directory
