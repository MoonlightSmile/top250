class Search extends App {
  constructor(wrap) {
    super(wrap)
    this.btn = this.wrap.find(`.btn`)
  }
  init() {
    this.bindEvents((key)=> {
      super.getData("https://api.douban.com/v2/movie/search",(json)=>{
        json.subjects.forEach((ele, index) => {
        this.wrap.find(".container").append(super.createNode(ele))
      })
      },{q:key})
    })
  }
  bindEvents(callBack) {
    this.btn.click(() => {
      this.wrap.find(`.container`).empty()
      let key = this.wrap.find("input[type=search]").val()
      if (key === "") return;
      callBack&&callBack(key)
    })

  }
}