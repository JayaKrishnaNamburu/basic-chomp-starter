Chomp.addExtension("chomp@0.1:npm");

Chomp.registerTemplate("teleportHQ", function (task) {
  const { autoInstall, outdir = "dist", entry } = task.templateOptions;

  return [
    {
      name: task.name,
      deps: [
        ...task.deps,
        ...(ENV.CHOMP_EJECT
          ? ["npm:install"]
          : ["node_modules/@jspm/generator", "node_modules/node-html-parser"]),
      ],
      targets: [...new Set([...task.targets])],
      engine: "node",
      invalidation: "always",
      run: `
import { Generator } from '@jspm/generator'
import { readFile, writeFile } from 'fs/promises';
import { pathToFileURL } from 'url'
import { parse, HTMLElement } from 'node-html-parser'
const htmlSource = await readFile('index.html', 'utf-8')
const teleportConfig = JSON.parse(await readFile('teleport.config.json', 'utf-8') || {})

const generator = new Generator({
  mapUrl: import.meta.url,
  env: ['production', 'browser', 'module'],
  inputMap: teleportConfig?.importmap || {}
});

// Once the bug is solved from @jspm/generator, we and delegate the work of adding import-map to it
// const outputHTML = await generator.htmlGenerate(htmlSource, { esModuleShims: true, preload: true  })
const DOM = parse(htmlSource)
const head = DOM.querySelector('head')
const body = DOM.querySelector('body')

const importMap = new HTMLElement('script', {}, 'type="importmap"')
importMap.innerHTML = JSON.stringify(generator.getMap(), null, 2)
const shims = new HTMLElement('script', {}, 'crossorigin="anonymous" async src="https://ga.jspm.io/npm:es-module-shims@1.5.1/dist/es-module-shims.js"',)
const polyfill = new HTMLElement('script', {}, "type='text/javascript'")
polyfill.innerHTML = 'globalThis.process = { env: "production" }'

const entry = new HTMLElement('script', {}, "type='module', src='${entry}'")

head.childNodes.unshift(...[polyfill, shims, importMap])
body.childNodes.push(entry)

const outputHTML = DOM.toString()
await writeFile(pathToFileURL("${outdir}/index.html"), outputHTML)
      `,
    },
    ...(ENV.CHOMP_EJECT
      ? []
      : [
          {
            template: "npm",
            templateOptions: {
              autoInstall,
              packages: ["@jspm/generator", "node-html-parser@5.2.0"],
              dev: true,
            },
          },
        ]),
  ];
});
