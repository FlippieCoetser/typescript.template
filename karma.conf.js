const path = require("path");

module.exports = function(config) {
    config.set({
        frameworks: ["jasmine"],
        files: [
            { pattern: "./src/**/*.js", type: "module" },
            { pattern: "./test/**/*.js", type: "module" }
        ],
        customContextFile: "tasks/custom.context.html",
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
