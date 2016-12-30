module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y"
    ],
    "rules": {
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ],
        "jsx-quotes": [ "error" ],
        "no-multi-spaces": [ "error" ],
        "react/no-multi-comp": [ "error" ],
        "react/prefer-es6-class": [ "error" ],
        // "react/prefer-stateless-function": [ "error" ],
        "react/jsx-pascal-case": [ "error" ],
        "react/jsx-closing-bracket-location": [ "error" ],
        "react/jsx-space-before-closing": [ "error" ],
        "react/jsx-curly-spacing": [ "error", "always", { "allowMultiline": true } ],
        "react/jsx-boolean-value": [ "error" ],
        "react/no-string-refs": [ "error" ],
        "react/jsx-wrap-multilines": [ "error" ],
        "react/self-closing-comp": [ "error" ],
        "react/jsx-no-bind": [ "error" ],
        "react/require-render-return": [ "error" ],
        "react/no-is-mounted": [ "error" ],
        "jsx-a11y/img-has-alt": [ "error" ],
        "jsx-a11y/img-redundant-alt": [ "error" ],
        "jsx-a11y/no-access-key": [ "error" ]
    }
};
