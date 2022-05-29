const path = require("path");

module.exports = function(config) {
    config.set({
        frameworks: ["jasmine"],
        proxies: {
            '/lib/css/': '/base/lib/css'
        },
        files: [
            { pattern: "./src/**/*.js", type: "module" },
            { pattern: "./test/**/*.js", type: "module" },
            { pattern: "./lib/css/*.css", type: 'css'}
        ],
        preprocessors: {
            "src/**/!(*.test).js": ["karma-coverage-istanbul-instrumenter"]
        },
        reporters: ["spec","junit", "coverage-istanbul"],
        junitReporter: {
            outputDir: './output',
            outputFile: undefined, 
            suite: '', 
            useBrowserName: false, 
            nameFormatter: undefined,
            classNameFormatter: undefined, 
            properties: {}, 
            xmlVersion: null 
        },
        coverageIstanbulInstrumenter: {
            esModules: true
        },
        coverageIstanbulReporter: {
            reports: ["html", "text", "lcovonly"],
            dir: path.join(__dirname, "coverage"),
            skipFilesWithNoCoverage: true
        },
        browsers: ["ChromeHeadless"],
        singleRun: true
    });
};
