module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // você pode configurar opções globais do Jasmine aqui
      },
      clearContext: false // deixa os resultados visíveis no navegador
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'], // progress no terminal, kjhtml no navegador
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true, // observa mudanças no código e roda testes automaticamente
    browsers: ['ChromeHeadless'], // você pode usar 'Chrome' ou 'ChromeHeadless'
    singleRun: false, // se true, roda uma vez e finaliza (bom para CI)
    restartOnFileChange: true
  });
};