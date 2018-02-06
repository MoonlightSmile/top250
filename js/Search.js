class Search extends App {
  constructor(wrap) {
    super(wrap)
    this.btn = this.wrap.find(`.btn`)
  }
  init() {
    this.bindEvents()
  }

  getData(keyword) {
    this.wrap.find(`.loading`).addClass('a')
    $.ajax({
      type: "get",
      url: "https://api.douban.com/v2/movie/search",
      data: {
        q: keyword
      },
      dataType: "jsonp"
    }).done((json) => {
      json.subjects.forEach((ele, index) => {
        this.wrap.find(".container").append(super.createNode(ele))
      })
    }).fail(() => {
      console.log("error");
    }).always(() => {
      this.wrap.find(`.loading`).removeClass("a")
    })
  }
  bindEvents() {
    this.btn.click(() => {
      this.wrap.find(`.container`).empty()
      let key = this.wrap.find("input[type=search]").val()
      if (key === "") return;
      this.getData(key)
    })

  }
}