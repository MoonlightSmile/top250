const App = require("./App.js")
class Us extends App {
  constructor(wrap) {
    super(wrap)
  }

  init() {
    super.getData("https://api.douban.com/v2/movie/us_box", (json) => {
      json.subjects.forEach((ele, index) => {
        this.wrap.find(".container").append(super.createNode(ele.subject))
      });
    })
  }

}


module.exports = Us