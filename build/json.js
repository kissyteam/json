modulex.add("json",[],function(t,n,e){var r,i,o,u,a,s;r=function(t){var n={"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t",'"':'\\"'},e={},r=/["\b\f\n\r\t\x00-\x1f]/g,i=/\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\"|\\u[0-9a-zA-Z]{4}/g;for(var o in n){var u=n[o];e[u]=o}return e["\\/"]="/",e["\\\\"]="\\",t={quote:function(t){return'"'+t.replace(r,function(t){var e;return(e=n[t])||(e="\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)),e})+'"'},unQuote:function(t){return t.slice(1,t.length-1).replace(i,function(t){var n;return(n=e[t])||(n=String.fromCharCode(parseInt(t.slice(2),16))),n})}}}(),i=function(t){var n={}.toString,e=!{toString:1}.propertyIsEnumerable("toString"),r=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toString","toLocaleString","valueOf"];return t={isArray:Array.isArray||function(t){return"[object Array]"===n.call(t)},inArray:function(t,n){for(var e=0,r=n.length;r>e;e++)if(n[e]===t)return!0;return!1},keys:Object.keys||function(t){var n,i,o=[];for(n in t)t.hasOwnProperty(n)&&o.push(n);if(e)for(i=r.length-1;i>=0;i--)n=r[i],t.hasOwnProperty(n)&&o.push(n);return o}}}(),o=function(t){var n=function(t){function n(t,n){for(var e in n)t[e]=n[e]}function e(t){return"[object Array]"===Object.prototype.toString.call(t)}function r(t,n,r){if(t){var i,o,u,a=0;if(r=r||null,e(t))for(u=t.length,o=t[0];u>a&&n.call(r,o,a,t)!==!1;o=t[++a]);else for(i in t)if(n.call(r,t[i],i,t)===!1)break}}function i(t,n){for(var e=0,r=n.length;r>e;e++)if(n[e]===t)return!0;return!1}var o={},u={SHIFT_TYPE:1,REDUCE_TYPE:2,ACCEPT_TYPE:0,TYPE_INDEX:0,PRODUCTION_INDEX:1,TO_INDEX:2},a=function(t){var e=this;e.rules=[],n(e,t),e.resetInput(e.input)};a.prototype={resetInput:function(t){n(this,{input:t,matched:"",stateStack:[a.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},getCurrentRules:function(){var t=this,n=t.stateStack[t.stateStack.length-1],e=[];return t.mapState&&(n=t.mapState(n)),r(t.rules,function(t){var r=t.state||t[3];r?i(n,r)&&e.push(t):n===a.STATIC.INITIAL&&e.push(t)}),e},pushState:function(t){this.stateStack.push(t)},popState:function(t){t=t||1;for(var n;t--;)n=this.stateStack.pop();return n},showDebugInfo:function(){var t=this,n=a.STATIC.DEBUG_CONTEXT_LIMIT,e=t.matched,r=t.match,i=t.input;e=e.slice(0,e.length-r.length);var o=(e.length>n?"...":"")+e.slice(0-n).replace(/\n/," "),u=r+i;return u=u.slice(0,n)+(u.length>n?"...":""),o+u+"\n"+new Array(o.length+1).join("-")+"^"},mapSymbol:function(t){return this.symbolMap[t]},mapReverseSymbol:function(t){var n,e=this,r=e.symbolMap,i=e.reverseSymbolMap;if(!i&&r){i=e.reverseSymbolMap={};for(n in r)i[r[n]]=n}return i?i[t]:t},lex:function(){var e,r,i,o,u,s=this,l=s.input,c=s.getCurrentRules();if(s.match=s.text="",!l)return s.mapSymbol(a.STATIC.END_TAG);for(e=0;e<c.length;e++){r=c[e];var f=r.regexp||r[1],h=r.token||r[0],p=r.action||r[2]||t;if(i=l.match(f)){u=i[0].match(/\n.*/g),u&&(s.lineNumber+=u.length),n(s,{firstLine:s.lastLine,lastLine:s.lineNumber+1,firstColumn:s.lastColumn,lastColumn:u?u[u.length-1].length-1:s.lastColumn+i[0].length});var g;return g=s.match=i[0],s.matches=i,s.text=g,s.matched+=g,o=p&&p.call(s),o=o===t?h:s.mapSymbol(o),l=l.slice(g.length),s.input=l,o?o:s.lex()}}}},a.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};var s=new a({rules:[["b",/^"(\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[0-9a-zA-Z]{4}|[^\\"\x00-\x1f])*"/,0],[0,/^[\t\r\n\x20]/,0],["c",/^,/,0],["d",/^:/,0],["e",/^\[/,0],["f",/^\]/,0],["g",/^\{/,0],["h",/^\}/,0],["i",/^-?\d+(?:\.\d+)?(?:e-?\d+)?/i,0],["j",/^true|false/,0],["k",/^null/,0],["l",/^./,0]]});return o.lexer=s,s.symbolMap={$EOF:"a",STRING:"b",COMMA:"c",COLON:"d",LEFT_BRACKET:"e",RIGHT_BRACKET:"f",LEFT_BRACE:"g",RIGHT_BRACE:"h",NUMBER:"i",BOOLEAN:"j",NULL:"k",INVALID:"l",$START:"m",json:"n",value:"o",object:"p",array:"q",elementList:"r",member:"s",memberList:"t"},o.productions=[["m",["n"]],["n",["o"],function(){return this.$1}],["o",["b"],function(){return this.yy.unQuote(this.$1)}],["o",["i"],function(){return parseFloat(this.$1)}],["o",["p"],function(){return this.$1}],["o",["q"],function(){return this.$1}],["o",["j"],function(){return"true"===this.$1}],["o",["k"],function(){return null}],["r",["o"],function(){return[this.$1]}],["r",["r","c","o"],function(){return this.$1[this.$1.length]=this.$3,this.$1}],["q",["e","f"],function(){return[]}],["q",["e","r","f"],function(){return this.$2}],["s",["b","d","o"],function(){return{key:this.yy.unQuote(this.$1),value:this.$3}}],["t",["s"],function(){var t={};return t[this.$1.key]=this.$1.value,t}],["t",["t","c","s"],function(){return this.$1[this.$3.key]=this.$3.value,this.$1}],["p",["g","h"],function(){return{}}],["p",["g","t","h"],function(){return this.$2}]],o.table={gotos:{0:{n:7,o:8,q:9,p:10},2:{o:12,r:13,q:9,p:10},3:{s:16,t:17},18:{o:23,q:9,p:10},20:{o:24,q:9,p:10},21:{s:25}},action:{0:{b:[1,t,1],e:[1,t,2],g:[1,t,3],i:[1,t,4],j:[1,t,5],k:[1,t,6]},1:{a:[2,2],f:[2,2],c:[2,2],h:[2,2]},2:{b:[1,t,1],e:[1,t,2],f:[1,t,11],g:[1,t,3],i:[1,t,4],j:[1,t,5],k:[1,t,6]},3:{b:[1,t,14],h:[1,t,15]},4:{a:[2,3],f:[2,3],c:[2,3],h:[2,3]},5:{a:[2,6],f:[2,6],c:[2,6],h:[2,6]},6:{a:[2,7],f:[2,7],c:[2,7],h:[2,7]},7:{a:[0]},8:{a:[2,1]},9:{a:[2,5],f:[2,5],c:[2,5],h:[2,5]},10:{a:[2,4],f:[2,4],c:[2,4],h:[2,4]},11:{a:[2,10],f:[2,10],c:[2,10],h:[2,10]},12:{f:[2,8],c:[2,8]},13:{c:[1,t,18],f:[1,t,19]},14:{d:[1,t,20]},15:{a:[2,15],f:[2,15],c:[2,15],h:[2,15]},16:{h:[2,13],c:[2,13]},17:{c:[1,t,21],h:[1,t,22]},18:{b:[1,t,1],e:[1,t,2],g:[1,t,3],i:[1,t,4],j:[1,t,5],k:[1,t,6]},19:{a:[2,11],f:[2,11],c:[2,11],h:[2,11]},20:{b:[1,t,1],e:[1,t,2],g:[1,t,3],i:[1,t,4],j:[1,t,5],k:[1,t,6]},21:{b:[1,t,14]},22:{a:[2,16],f:[2,16],c:[2,16],h:[2,16]},23:{f:[2,9],c:[2,9]},24:{h:[2,12],c:[2,12]},25:{h:[2,14],c:[2,14]}}},o.parse=function(n,e){var r,i,o,a=this,s=a.lexer,l=a.table,c=l.gotos,f=l.action,h=a.productions,p=[null],g=e?"in file: "+e+" ":"",v=[0];for(s.resetInput(n);;){if(r=v[v.length-1],i||(i=s.lex()),o=i?f[r]&&f[r][i]:null,!o){var y,m=[];if(f[r])for(var T in f[r])m.push(a.lexer.mapReverseSymbol(T));throw y=g+"syntax error at line "+s.lineNumber+":\n"+s.showDebugInfo()+"\nexpect "+m.join(", "),new Error(y)}switch(o[u.TYPE_INDEX]){case u.SHIFT_TYPE:v.push(i),p.push(s.text),v.push(o[u.TO_INDEX]),i=null;break;case u.REDUCE_TYPE:var b,I=h[o[u.PRODUCTION_INDEX]],S=I.symbol||I[0],E=I.action||I[2],C=I.rhs||I[1],A=C.length,$=0,d=p[p.length-A];for(b=t,a.$$=d;A>$;$++)a["$"+(A-$)]=p[p.length-1-$];E&&(b=E.call(a)),d=b!==t?b:a.$$,v=v.slice(0,-1*A*2),p=p.slice(0,-1*A),v.push(S),p.push(d);var N=c[v[v.length-2]][v[v.length-1]];v.push(N);break;case u.ACCEPT_TYPE:return d}}},o}();return"undefined"!=typeof e&&(t=n),t}(),u=function(t){function n(t){return 10>t?"0"+t:t}function e(t,e,r,i,a,c,f){var h=e[t];switch(h&&"object"==typeof h&&("function"==typeof h.toJSON?h=h.toJSON(t):h instanceof Date?h=isFinite(h.valueOf())?h.getUTCFullYear()+"-"+n(h.getUTCMonth()+1)+"-"+n(h.getUTCDate())+"T"+n(h.getUTCHours())+":"+n(h.getUTCMinutes())+":"+n(h.getUTCSeconds())+"Z":null:(h instanceof String||h instanceof Number||h instanceof Boolean)&&(h=h.valueOf())),void 0!==r&&(h=r.call(e,t,h)),typeof h){case"number":return isFinite(h)?String(h):"null";case"string":return s.quote(h);case"boolean":return String(h);case"object":return h?l.isArray(h)?u(h,r,i,a,c,f):o(h,r,i,a,c,f):"null"}return void 0}function o(t,n,r,i,o,u){var a=u;u+=i;var c,f,h,p;c=void 0!==r?r:l.keys(t);var g=[];for(h=0,f=c.length;f>h;h++){p=c[h];var v=e(p,t,n,r,i,o,u);if(void 0!==v){var y=s.quote(p);y+=":",i&&(y+=" "),y+=v,g[g.length]=y}}var m;if(g.length)if(i){var T=",\n"+u,b=g.join(T);m="{\n"+u+b+"\n"+a+"}"}else m="{"+g.join(",")+"}";else m="{}";return m}function u(t,n,r,i,o,u){var a=u;u+=i;for(var s=[],l=t.length,c=0;l>c;){var f=e(String(c),t,n,r,i,o,u);s[s.length]=void 0===f?"null":f,++c}var h;if(s.length)if(i){var p="\n,"+u,g=s.join(p);h="[\n"+u+g+"\n"+a+"]"}else h="["+s.join(",")+"]";else h="[]";return h}function a(t,n,r){var i,o,u="";return n&&("function"==typeof n?o=n:l.isArray(n)&&(i=n)),"number"==typeof r?(r=Math.min(10,r),u=new Array(r+1).join(" ")):"string"==typeof r&&(u=r.slice(0,10)),e("",{"":t},o,i,u,[],"")}var s=r,l=i;return t=a}(),a=function(t){function n(t,e,r){var i,o,u,s=t[e];if("object"==typeof s)if(a.isArray(s)){i=0,o=s.length;for(var l=[];o>i;)u=n(s,String(i),r),void 0!==u&&(l[l.length]=u);s=l}else{var c=a.keys(s);for(i=0,o=c.length;o>i;i++){var f=c[i];u=n(s,f,r),void 0===u?delete s[f]:s[f]=u}}return r.call(t,e,s)}var e=o,u=r,a=i;return e.yy={unQuote:u.unQuote},t=function(t,r){var i=e.parse(String(t));return r?n({"":i},"",r):i}}(),s=function(t){var n=u,e=a;return t={version:"1.0.2",stringify:n,parse:e}}(),e.exports=s});