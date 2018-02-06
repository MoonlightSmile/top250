import "./css/font.css"
import "./css/style.css"
const $ = require("jquery")
const Top250 = require("./js/Top250.js")
const Us =require("./js/Us.js")
const Search = require("./js/Search.js")




$("ul li").click(function() {
  let $index = $(this).index()
  $(this).addClass("active").siblings().removeClass("active")
  $(`section`).hide().eq($index).fadeIn()
}).eq(0).click()


var a = new Top250(`.top`)
var c = new Us(`.us`)
var b = new Search(`.search`)
b.init()
a.init()
c.init()