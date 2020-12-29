/**
 * js截取最后一个标识之后/之前的内容
 * @param {*} obj
 */

// js 获取字符串中最后一个斜杠前面的内容:
var str = "abcd/efg.higk,lmn;opq'rst/uvw!xyz";
var index = str.lastIndexOf("\/");
str = str.substring(0, index + 1);
// abcd/efg.higk,lmn;opq'rst/

// 获取最后一个"/"之后的内容
var str = "abcd/efg.higk,lmn;opq'rst/uvw!xyz";
var index = str.lastIndexOf("\/");
str = str.substring(index + 1, str.length);
// rhh

// 获取第一个"."至最后一个"/"的内容
var str = "abcd/efg.higk,lmn;opq'rst/uvw!xyz";
var index = str.indexOf("\.");
var index2 = str.lastIndexOf("\/");
str = str.substring(index + 1, index2);