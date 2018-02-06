const App = require("./App.js")
const $ = require("jquery")

class Top250 extends App {
  constructor(wrap) {
    super(wrap);
    this.index = 0;
    this.count = 10;
    this.loading = false;
    this.isFinished = false
  }

  init() {
    this.getData()
    this.bindEvents()
  };

  getData() {
    if (this.isFinished) return
    if (this.loading) return;
    this.loading = true
    this.wrap.find(`.loading`).addClass('a')
    $.ajax({
      type: "get",
      url: "https://api.douban.com/v2/movie/top250",
      data: {
        start: this.index,
        count: this.count
      },
      dataType: "jsonp"
    }).done((json) => {
      this.index += 10
      json.subjects.forEach((ele, index) => {
        this.wrap.find(".container").append(super.createNode(ele))
      })
      if (this.strat > json.total) {
        this.isFinished = true
      }
    }).fail(() => {
      console.log("error");
    }).always(() => {
      this.loading = false
      this.wrap.find(`.loading`).removeClass("a")
    })
  }

  isEnd($viewport, $content) {
    return $viewport.height() + $viewport.scrollTop() + 10 >= $content.height()
  };
  bindEvents() {
    let _this = this
    this.wrap.scroll(function(event) {
      if (_this.isEnd($(this), $(this).find(`.container`))) {
        _this.getData()
      }
    });


  };
}



module.exports = Top250