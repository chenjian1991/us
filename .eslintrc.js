module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    "$cookies": true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb-base'
  ],
  settings: {
    'import/resolver': {
      'webpack': {
        config: 'node_modules/@vue/cli-service/webpack.config.js'
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'always', {
      'js': 'off',
      'vue': 'off'
    }], // 禁用增加or不增加后缀错误提示
    'import/order': 'off', // 禁用import引入排序
    // 'comma-dangle': ['error', 'never'], // 禁用拖尾逗号
    "comma-dangle": 'off',
    'semi': 'off', // 不提示是否添加分号
    'quotes': 'off', // 不强制区分使用双引号、单引号
    'space-before-blocks': 'off', // 不强制在块之前使用一致的空格
    'space-before-function-paren': 'off', // 强制在'function'的左括号之前使用一致的空格
    'key-spacing': 'off', // 强制在对象字面量的属性中键和值之间使用一致的间距 禁用此检测
    'import/first': 'off', // 
    'func-names': 'off', // 要求funcion必须有命名   禁用此检测
    // 'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号 禁用此检测
    'spaced-comment': 'off', // 要求在注释中使用一致的空格 
    'no-restricted-globals': [ // 禁用特定的全局变量  
      'error',
      {
        'name': 'location',  // 对使用location的地方提示 使用window.location的方式
        'message': 'Use window.location'
      }
    ],
    'eol-last': ['error', 'never'], // 文档末尾不允许有换行
    'max-len': 'off', // 强制一行的最大长度 禁用此检测
    'keyword-spacing': 'off', // 强制在关键字前后使用一致的空格 禁用此检测
    'no-else-return': 'off', // 禁止if语句中return语句之后有else模块
    'import/newline-after-import': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off', // 禁止出现悬空下划线  禁用此检测
    'vue/no-parsing-error': ['error', {
      "x-invalid-end-tag": false
    }],
    'no-multiple-empty-lines': 'off',
    'padded-blocks': 'off',
    'import/prefer-default-export': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
