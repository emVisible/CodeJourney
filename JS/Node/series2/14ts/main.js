const typescript = require('typescript')
const fs = require('fs')

module.require.extensions['.ts'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const compiled = typescript.transpileModule(content, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS
    }
  })

  module._compile(compiled.outputText, filename)
}