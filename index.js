const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (config, env) => {
    if (env !== 'production') {
        return config;
    }

    config.output.filename = 'static/js/custom-element.js';
    config.output.chunkFilename = 'static/js/custom-element.chunk.js';

    const entryWas = resolveApp('./src/index.js');
    const newEntry = resolveApp('./src/custom-element.js');
    config.entry = config.entry.map(e => e == entryWas ? newEntry : e);

    config.module.rules.forEach(rule => {
        if (rule.test && rule.test.toString()) {
            switch (rule.test.toString()) {
                case '/\\.css$/':
                    rule.use = rule.use.map(item => {
                        if (typeof item === 'string' && item.includes('mini-css-extract-plugin')) {
                            return require.resolve('to-string-loader');
                        }

                        return item;
                    });
                break;
            }
        }
    });

    delete config.optimization.splitChunks;
    delete config.optimization.runtimeChunks;

    return config;
};
