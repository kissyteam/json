### 概览

IE6-8等老的浏览器未提供`JSON`的原生支持，`json`模块提供“_polyfill_”（但并未在`window`对象上挂载JSON，所以严格意义上来说不算_polyfill_），可以让开发放心地使用`JSON`。

* version: "1.0.4"
* parse: function(str, reviver)
* stringify: stringify(value, replacer, space)

### version

返回版本号 目前为"1.0.4"

### parse(str\[, reviver\])

用于将文本解析成JavaScript的值。

#### 参数

**str:String**

被解析的文本，JSON语法参考这里<http://www.json.org/json-en.html>。若`str`不是字符串，会尝试使用`toString()`后再进行转换（但`null`有些特殊，它没有`toString`，但能被直接返回）。

**reviver:Function** 可选

对JSON对象进行深度优先遍历，可以对每一个遍历到得值进行转换，该方法必须有返回值，否则最终将得到`undefined`。需要注意的是，`reviver`接收到的参数为`(key, value)`，而不是如`Array`的`forEach|map|filter|some`等方法那样是`(value, key)。

#### 返回:\*

返回解析后的对象（注意这里是广义的对象，也包括字符串，数字，布尔值和`null`）。

#### 抛错

如果给的参数不是合法的JSON字符串，将抛`SyntaxError`错误。

参考：<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse>

### stringify(value\[, replacer\[, space\]\])

跟`parse`正好相反，用于将JavaScript的值转成字符串。


**value:\***

用于转变成字符串的JavaScript值。

**replacer:Function|Array** 可选

当为`Function`时，可以对每个遍历到的值进行改变；也可以是个包含字符串或数字的数组，相当于属性白名单。

**space:String|Number** 可选

默认返回的字符串是最小化的，没有缩进、换行；该参数用于指定缩进，以输出“美观”的JSON字符串。当为字符串时，用它（无论是空白字符还是类似`--`的字符串）作为缩进文本，当为数字时，使用数字指定的个数的空格作为缩进。最后，要注意的一点，无论是字符串还是数字，缩进字符串长度都不会超过10（如果是字符串，将被截断）。

参考：<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify>