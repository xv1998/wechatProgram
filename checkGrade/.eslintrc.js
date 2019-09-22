module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals":{
        "Page":true,
        "wx":true,
        "seData":true
    },
    "root":true,
    "rules": {
        //
        //
        // 可能的错误
        // 这些规则与 JavaScript 代码中可能的语法错误或逻辑错误有关
        //
        // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
        "for-direction": "error",
        // getter 必须有返回值，并且禁止返回空，比如 return;
        "getter-return": [
            "error",
            {
                allowImplicit: false
            }
        ],
        // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
        // @off 要求太严格了，有时需要在循环中写 await
        "no-await-in-loop": "off",
        // 禁止与负零进行比较
        "no-compare-neg-zero": "error",
        // 禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
        "no-cond-assign": [
            "error",
            "except-parens"
        ],
        // 禁止使用 console
        // @off console 的使用很常见
        "no-console": "off",
        // 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
        "no-constant-condition": [
            "error",
            {
                checkLoops: false
            }
        ],
        // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
        // @off 几乎不会遇到这种场景
        "no-control-regex": "off",
        // @fixable 禁止使用 debugger
        "no-debugger": "error",
        // 禁止在函数参数中出现重复名称的参数
        'no-dupe-args': 'error',
        // 禁止在对象字面量中出现重复名称的键名
        'no-dupe-keys': 'error',
        // 禁止在 switch 语句中出现重复测试表达式的 case
        'no-duplicate-case': 'error',
        // 禁止出现空代码块，允许 catch 为空代码块
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        // 禁止在正则表达式中使用空的字符集 []
        'no-empty-character-class': 'error',
        // 禁止将 catch 的第一个参数 error 重新赋值
        'no-ex-assign': 'error',
        // @fixable 禁止不必要的布尔类型转换，比如 !! 或 Boolean
        'no-extra-boolean-cast': 'error',
        // @fixable 禁止函数表达式中出现多余的括号，比如 let foo = (function () { return 1 })
        'no-extra-parens': [
            'error',
            'functions'
        ],
        // @fixable 禁止出现多余的分号
        'no-extra-semi': 'error',
        // 禁止将一个函数声明重新赋值，如：
        // function foo() {}
        // foo = bar
        'no-func-assign': 'error',
        // 禁止在 if 代码块内出现函数声明
        'no-inner-declarations': [
            'error',
            'both'
        ],
        // 禁止在 RegExp 构造函数中出现非法的正则表达式
        'no-invalid-regexp': 'error',
        // 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: true,
                skipComments: false,
                skipRegExps: true,
                skipTemplates: true
            }
        ],
        // 禁止将 Math, JSON 或 Reflect 直接作为函数调用
        'no-obj-calls': 'error',
        // 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
        // @off hasOwnProperty 比较常用
        'no-prototype-builtins': 'off',
        // @fixable 禁止在正则表达式中出现连续的空格，必须使用 /foo {3}bar/ 代替
        'no-regex-spaces': 'error',
        // 禁止在数组中出现连续的逗号，如 let foo = [,,]
        'no-sparse-arrays': 'error',
        // 禁止在普通字符串中出现模版字符串里的变量形式，如 'Hello ${name}!'
        'no-template-curly-in-string': 'error',
        // 禁止出现难以理解的多行表达式，如：
        // let foo = bar
        // [1, 2, 3].forEach(baz);
        'no-unexpected-multiline': 'error',
        // 禁止在 return, throw, break 或 continue 之后还有代码
        'no-unreachable': 'error',
        // 禁止在 finally 中出现 return, throw, break 或 continue
        'no-unsafe-finally': 'error',
        // @fixable 禁止在 in 或 instanceof 操作符的左侧使用感叹号，如 if (!key in object)
        'no-unsafe-negation': 'error',
        // 必须使用 isNaN(foo) 而不是 foo === NaN
        'use-isnan': 'error',
        // 注释必须符合 jsdoc 的规范
        // @off jsdoc 要求太严格
        'valid-jsdoc': 'off',
        // typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol'
        'valid-typeof': 'error',


        //
        //
        // 最佳实践
        // 这些规则通过一些最佳实践帮助你避免问题
        //
        // setter 必须有对应的 getter，getter 可以没有对应的 setter
        'accessor-pairs': [
            'error',
            {
                setWithoutGet: true,
                getWithoutSet: false
            }
        ],
        // 数组的方法除了 forEach 之外，回调函数必须有返回值
        'array-callback-return': 'error',
        // 将 var 定义的变量视为块作用域，禁止在块外使用
        'block-scoped-var': 'error',
        // 在类的非静态方法中，必须存在对 this 的引用
        // @off 太严格了
        'class-methods-use-this': 'off',
        // 禁止函数的循环复杂度超过 20，https://en.wikipedia.org/wiki/Cyclomatic_complexity
        'complexity': [
            'error',
            {
                max: 20
            }
        ],
        // 禁止函数在不同分支返回不同类型的值
        // @off 太严格了
        'consistent-return': 'off',
        // @fixable if 后面必须要有 {，除非是单行 if
        'curly': [
            'error',
            'multi-line',
            'consistent'
        ],
        // switch 语句必须有 default
        // @off 太严格了
        'default-case': 'off',
        // @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
        'dot-location': [
            'error',
            'property'
        ],
        // @fixable 禁止出现 foo['bar']，必须写成 foo.bar
        // @off 当需要写一系列属性的时候，可以更统一
        'dot-notation': 'off',
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        // for in 内部必须有 hasOwnProperty
        'guard-for-in': 'error',
        // 禁止使用 alert
        // @off alert 很常用
        'no-alert': 'off',
        // 禁止使用 caller 或 callee
        'no-caller': 'error',
        // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
        'no-case-declarations': 'error',
        // 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
        // @off 有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难
        'no-div-regex': 'off',
        // @fixable 禁止在 else 内使用 return，必须改为提前结束
        // @off else 中使用 return 可以使代码结构更清晰
        'no-else-return': 'off',
        // 不允许有空函数，除非是将一个空函数设置为某个项的默认值
        'no-empty-function': [
            'error',
            {
                allow: [
                    'functions',
                    'arrowFunctions'
                ]
            }
        ],
        // 禁止解构中出现空 {} 或 []
        'no-empty-pattern': 'error',
        // 禁止使用 foo == null 或 foo != null，必须使用 foo === null 或 foo !== null
        // @off foo == null 用于判断 foo 不是 undefined 并且不是 null，比较常用，故允许此写法
        'no-eq-null': 'off',
        // 禁止使用 eval
        'no-eval': 'error',
        // 禁止修改原生对象
        'no-extend-native': 'error',
        // @fixable 禁止出现没必要的 bind
        'no-extra-bind': 'error',
        // @fixable 禁止出现没必要的 label
        'no-extra-label': 'error',
        // switch 的 case 内必须有 break, return 或 throw
        'no-fallthrough': 'error',
        // @fixable 表示小数时，禁止省略 0，比如 .5
        'no-floating-decimal': 'error',
        // 禁止对全局变量赋值
        'no-global-assign': 'error',
        // @fixable 禁止使用 !! ~ 等难以理解的运算符
        // 仅允许使用 !!
        'no-implicit-coercion': [
            'error',
            {
                allow: [
                    '!!'
                ]
            }
        ],
        // 禁止在全局作用域下定义变量或申明函数
        'no-implicit-globals': 'error',
        // 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
        'no-implied-eval': 'error',
        // 禁止在类之外的地方使用 this
        // @off this 的使用很灵活，事件回调中可以表示当前元素，函数也可以先用 this，等以后被调用的时候再 call
        'no-invalid-this': 'off',
        // 禁止使用 __iterator__
        'no-iterator': 'error',
        // 禁止使用 label
        'no-labels': 'error',
        // 禁止使用没必要的 {} 作为代码块
        'no-lone-blocks': 'error',
        // 禁止在循环内的函数中出现循环体条件语句中定义的变量，比如：
        // for (var i = 0; i < 10; i++) {
        //     (function () { return i })();
        // }
        'no-loop-func': 'error',
        // 禁止使用 magic numbers
        // @off 太严格了
        'no-magic-numbers': 'off',
        // @fixable 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true,
                exceptions: {
                    Property: true,
                    BinaryExpression: false,
                    VariableDeclarator: true,
                    ImportDeclaration: true
                }
            }
        ],
        // 禁止使用 \ 来换行字符串
        'no-multi-str': 'error',
        // 禁止直接 new 一个类而不赋值
        'no-new': 'error',
        // 禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b");
        'no-new-func': 'error',
        // 禁止使用 new 来生成 String, Number 或 Boolean
        'no-new-wrappers': 'error',
        // 禁止使用 0 开头的数字表示八进制数
        'no-octal': 'error',
        // 禁止使用八进制的转义符
        'no-octal-escape': 'error',
        // 禁止对函数的参数重新赋值
        'no-param-reassign': 'error',
        // 禁止使用 __proto__
        'no-proto': 'error',
        // 禁止重复定义变量
        'no-redeclare': 'error',
        // 禁止使用指定的对象属性
        // @off 它用于限制某个具体的 api 不能使用
        'no-restricted-properties': 'off',
        // 禁止在 return 语句里赋值
        'no-return-assign': [
            'error',
            'always'
        ],
        // 禁止在 return 语句里使用 await
        'no-return-await': 'error',
        // 禁止出现 location.href = 'javascript:void(0)';
        'no-script-url': 'error',
        // 禁止将自己赋值给自己
        'no-self-assign': 'error',
        // 禁止将自己与自己比较
        'no-self-compare': 'error',
        // 禁止使用逗号操作符
        'no-sequences': 'error',
        // 禁止 throw 字面量，必须 throw 一个 Error 对象
        'no-throw-literal': 'error',
        // 循环内必须对循环条件的变量有修改
        'no-unmodified-loop-condition': 'error',
        // 禁止无用的表达式
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true
            }
        ],
        // @fixable 禁止出现没用的 label
        'no-unused-labels': 'error',
        // 禁止出现没必要的 call 或 apply
        'no-useless-call': 'error',
        // 禁止出现没必要的字符串连接
        'no-useless-concat': 'error',
        // 禁止出现没必要的转义
        // @off 转义可以使代码更易懂
        'no-useless-escape': 'off',
        // @fixable 禁止没必要的 return
        // @off 没必要限制 return
        'no-useless-return': 'off',
        // 禁止使用 void
        'no-void': 'error',
        // 禁止注释中出现 TODO 和 FIXME
        // @off TODO 很常用
        'no-warning-comments': 'off',
        // 禁止使用 with
        'no-with': 'error',
        // Promise 的 reject 中必须传入 Error 对象，而不是字面量
        'prefer-promise-reject-errors': 'error',
        // parseInt 必须传入第二个参数
        'radix': 'error',
        // async 函数中必须存在 await 语句
        // @off async function 中没有 await 的写法很常见，比如 koa 的示例中就有这种用法
        'require-await': 'off',
        // var 必须在作用域的最前面
        // @off var 不在最前面也是很常见的用法
        'vars-on-top': 'off',
        // @fixable 立即执行的函数必须符合如下格式 (function () { alert('Hello') })()
        'wrap-iife': [
            'error',
            'inside',
            {
                functionPrototypeMethods: true
            }
        ],
        // @fixable 必须使用 if (foo === 5) 而不是 if (5 === foo)
        'yoda': [
            'error',
            'never',
            {
                onlyEquality: true
            }
        ],
    }
};