module.exports = {
    'parser': 'babel-eslint',
    'extends': 'airbnb',
    'plugins': [
        'react',
        'react-perf',
        'prettier',
        'lodash'
    ],
    "rules": {
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "invalidHref", "preferButton" ]
        }]
    },
    'env': {
        'browser': true
    }
};