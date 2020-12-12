const tags = require('./html-tags.json');

const tester = new RegExp('(\\s*<!doctype html>|(<html[/\\s]*>|<body[/\\s]*>|<x-[^>]+>)+)|'+tags.map(t=>`<${t}[/\\s]*>`).join('|'));

module.exports = str => tester.test(str.toString().toLowerCase());