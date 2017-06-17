var qs = require('qs');
var assert = require('assert');
var querystring =require('querystring');


var obj = qs.parse('foo=bar&abc=xyz&abc=123');
// assert.deepEqual(obj,{a:'c'});

var str = qs.stringify(obj);
// assert.equal(str, 'a=c')
console.log(obj);

var data = querystring.parse('foo=bar&abc=xyz&abc=123');
console.log(data);
