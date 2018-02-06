class Us extends App {
  constructor(wrap) {
    super(wrap)
  }


  getData() {
    this.wrap.find(`.loading`).addClass('a')
    $.ajax({
      type: "get",
      url: "https://api.douban.com/v2/movie/us_box",
      dataType: "jsonp"
    }).done((json) => {
      json.subjects.forEach((ele, index) => {
        this.wrap.find(".container").append(super.createNode(ele.subject))
      })
    }).fail(() => {
      console.log("error");
    }).always(() => {
      this.wrap.find(`.loading`).removeClass("a")
    })
  }
  init() {
    this.getData()
  }
}