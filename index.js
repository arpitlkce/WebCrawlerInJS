var cheerio = require('cheerio')
var request = require('request')
var parser = require('url-parse')

var inputPage = "http://www.arstechnica.com"
var keyword = "Goodin"
request(inputPage, function (error,response,body) {
	if(error)
		console.log("Error In response")
	if(response.statusCode === 200) {
		var CheerioObject = cheerio.load(body);
		console.log("Title :"+CheerioObject('title').text());
		searchForKeyWord(CheerioObject,keyword)
		searchForLinks(CheerioObject);
	}
});

function searchForKeyWord (cheerio,keyWord) {
  var body = cheerio('html > body').text();
	if(body.indexOf(keyWord) != -1) {
		console.log('word Found')
	} else
		console.log('word Not Found')

}

function searchForLinks(Cheerio) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = Cheerio("a[href^='/']");
  relativeLinks.each(function() {
      allRelativeLinks.push(Cheerio(this).attr('href'));

  });

  var absoluteLinks = Cheerio("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push(Cheerio(this).attr('href'));
  });





  console.log("Found " + relativeLinks + " relative links");

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}