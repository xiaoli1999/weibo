module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    globals: {
        WwLogin: true,
        WxLogin: true,
        process: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    rules: {
        indent: 'off',
        'no-eval': 'off',
        'no-extend-native': 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-mutating-props': 0,
        'vue/valid-v-bind-sync': 'off',
        'vue/html-indent': 'off', /* 关闭html缩进 */
        'vue/html-self-closing': 'off', /* 关闭自闭合 */
        'vue/max-attributes-per-line': 'off', /* 关闭强制换行 */
        'object-property-newline': 'off' /* 关闭对象导入强制换行 */
    }
}
