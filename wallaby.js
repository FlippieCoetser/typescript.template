// typescript paths is an example of how to map an npm module name directly to a file path.

module.exports = function(wallaby) {
    return {
        files: [
            "src/**/*.ts"
        ],
        tests: [
            "test/*.ts"
        ],
        trace: true,  
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                "module": "es2020",
                "target": "es2020",
                "sourceMap": true,
                "inlineSources": true
            })
        }
    };
}