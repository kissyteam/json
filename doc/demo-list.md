### demo

### parse(str\[, reviver\])

解析字符串为JavaScript对象，若不是合法的JSON字符串，抛出`SyntaxError`。

**一般case**

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		console.info(JSON.parse(what));
	}
	output("{}");// {}
	output("{\"a\": 1}");// Object { a=1 }
	output("[1, 5, \"false\"]");// [1, 5, "false"]
	output("true");// true
	output("false");// false
	output("null");// null
	output("\"string\"");// "string"
});
```

**特殊case**

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		console.info(JSON.parse(what));
	}
	output(123.4);// 123.4
	output(true);// true
	output(false);// false
	output(null);// null
	output({// Object {}
		toString: function() {
			return "{}";
		}
	});
});
```

**出错的case**

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		try {
			JSON.parse(what);
		} catch (ex) {
			console.info(ex.message, what);
		}
	}
	output();// str参数不可缺
	output(undefined);// 跟上一个一样
	output("string");// 须是"\"string\""
	output("");// 须是"\"\""
	output("1.2.3");// Number("1.2.3")为NaN
	output("{a: 1}");// JSON的属性名必须以双引号包裹，不能缺失
	output("{'a': 1}");// JSON的属性名必须以双引号包裹，不能以单引号代替
	output({// toString出来的不是合法的JSON字符串
		toString: function() {
			return "invalid";
		}
	});
	output("[1, 2, 3, 4, ]");// 跟eval不一样 JSON.parse不允许有多余的逗号
	output("{ \"foo\" : 1, }");// 同上
});
```

**reviver的使用**

一般情况下，`reviver`参数很少用到，但有些时候我们可能需要对原始输入做些修改的时候，就需要用到`reviver`。

```javascript
modulex.use("json", function(JSON) {
	var str = JSON.stringify({
			_: 1,
			__: {
				___: 2
			},
			____: [3, 4]
		}),
		o = JSON.parse(str, function(k, v) {
			console.log("k=", k, "v=", v);
			if (typeof v === "number") {
				return v * 2;
			}
			return v;
		});
	console.info(o);
});
```

以上代码输出如下（可以看到遍历的顺序为从叶节点到根节点，而兄弟节点是按顺序来的）：

```
k=_ v=1
k=___ v=2
k=__ v= Object { ___=4 }
k=0 v=3
k=1 v=4
k=____ v= [6, 8]
k=(an empty string) v= Object { _=2, __={ ___=4 }, ____=[6, 8] }
Object { _=2, __={ ___=4 }, ____=[6, 8] }
```

### stringify(value\[, replacer\[, space\]\])

将JavaScript对象转成JSON字符串并返回，只有一个case除外，就是`value`为`undefined`（或者不传）时，直接返回`undefined`本身。

**一般case**

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		console.info(JSON.stringify(what));
	}
	output({});// {}
	output({a: 1});// {"a":1}
	output([1, 5, "false"]);// [1, 5, "false"]
	output(true);// true
	output(false);// false
	output(null);// null
	output("");// ""
	output("string");// "string"
});
```

**特殊case**

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		console.info(JSON.stringify(what));
	}
	output();// undefined
	output(undefined);// undefined
	output(document);// {"location":{"href":"...
	output(Object);// undefined
	output(Array);// undefined
	output(Date);// undefined
	output(String);// undefined
	output(Number);// undefined
	output(Boolean);// undefined
	output(Math);// {}
	output({ a: undefined, b: Date });// {}
	output(Object.create(null, {// {"y":2}
		x: {
			value: 1,
			enumerable: false
		},
		y: {
			value: 2,
			enumerable: true
		}
	}));
});
```

**replacer**

`replacer`作为遍历的回调。

```javascript
modulex.use("json", function(JSON) {
	console.info(JSON.stringify({
		_: 1,
		__: {
			___: 2
		},
		____: [3, 4]
	}, function(k, v) {
		console.log("k=", k, "v=", v);
		if (typeof v === "number") {
			return v * 2;
		}
		return v;
	}));
});
```

以上代码输出如下（可以看到遍历的顺序为从根节点到叶节点，跟`parse`的`reviver`相反）：

```
k=(an empty string) v= Object { _=1, __={...}, ____=[2] }
k=_ v=1
k=__ v=Object { ___=2 }
k=___ v=2
k=____ v=[3, 4]
k=0 v=3
k=1 v=4
{"_":2,"__":{"___":4},"____":[6,8]}
```

利用`replacer`将对象序列化，并转换其中的非Unicode字符为Unicode：

```
modulex.use("json", function(JSON) {
	console.info(JSON.stringify({// {"en":"hello","ch":"\u4f60\u597d","jp":"\u3053\u3093\u306b\u3061\u306f"}
		en: "hello",
		ch: "你好",
		jp: "こんにちは"
	}, function(k, v) {
		if (typeof v === "string") {
			return v.replace(/[\u0080-\uFFFF]/g, function(m) {
				return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4);
			});
		}
		return v;
	}));
});
```

`replacer`为字符串数组是可用来作为白名单（注意白名单是逐层应用的）。

```javascript
modulex.use("json", function(JSON) {
	function output(what, replacer) {
		console.info(JSON.stringify(what, replacer));
	}
	output({// {"a":{"a":1,"b":2},"b":{}}
		a: {
			a: 1,
			b: 2
		},
		b: {
			d: 2
		}
	}, ["a", "b"]);
});
```

`space`用来输出格式“漂亮”的JSON

```javascript
modulex.use("json", function(JSON) {
	function output(what, space) {
		console.info(JSON.stringify(what, null, space));
	}
	var o = {
		a: {
			a: 1,
			b: 2
		},
		b: {
			d: 2
		}
	};
	output(o, 4);
	output(o, "-12345678-removed");// 任何字符串都可以做缩进 多余10个的字符串将被截断
});
```

输出：

```
{
	"a": {
		"a": 1,
		"b": 2
	},
	"b": {
		"d": 2
	}
}
{
-12345678-"a": {
-12345678--12345678-"a": 1,
-12345678--12345678-"b": 2
-12345678-},
-12345678-"b": {
-12345678--12345678-"d": 2
-12345678-}
}
```

`toJSON`对`stringify`的影响

```javascript
modulex.use("json", function(JSON) {
	function output(what) {
		console.info(JSON.stringify(what));
	}
	var o = {
		a: { a: 1 },
		toJSON: function() {
			return { b: 123 };
		}
	};
	output(o);// {"a":123}
	output({ o: o });// {"o":{"a":123}}
});
```