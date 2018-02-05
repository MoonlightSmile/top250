$("li").click(function() {
  let $index = $(this).index()
  $(this).addClass("active").siblings().removeClass("active")
  $(`section`).eq($index).show().siblings().hide()
}).eq(0).click()


function Top250(wrap) {
  this.wrap = $(wrap);
  this.index = 0;
  this.count = 10;
  this.loading = false;
  console.log(this.wrap)

}

Top250.prototype.init = function(argument) {
  this.getData()
  this.bindEvents()
};

Top250.prototype.getData = function() {
  if (this.loading) return;
  this.loading = true
  $(`.loading`).addClass('a')
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
      this.wrap.find(".container").append(this.createNode(ele))
    })
  }).fail(() => {
    console.log("error");
  }).always(() => {
    this.loading = false
    $(`.loading`).removeClass("a")
  })
}
Top250.prototype.createNode = function(movie) {
  var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
  var $node = $(template)
  $node.find('a').attr('href', movie.alt)
  $node.find('.cover img').attr('src', movie.images.small)
  $node.find('.detail h2').text(movie.title)
  $node.find('.score').text(movie.rating.average)
  $node.find('.collect').text(movie.collect_count)
  $node.find('.year').text(movie.year)
  $node.find('.type').text(movie.genres.join(' / '))
  $node.find('.director').text(function() {
    var directorsArr = []
    movie.directors.forEach(function(item) {
      directorsArr.push(item.name)
    })
    return directorsArr.join('、')
  })
  $node.find('.actor').text(function() {
    var actorArr = []
    movie.casts.forEach(function(item) {
      actorArr.push(item.name)
    })
    return actorArr.join('、')
  })
  return $node
}
Top250.prototype.isEnd = function($viewport, $content) {
  return $viewport.height() + $viewport.scrollTop() + 10 >= $content.height()
};
Top250.prototype.bindEvents = function() {
  let _this = this
  this.wrap.scroll(function(event) {
    if (_this.isEnd($(this), $(this).find(`.container`))) {
      _this.getData()
    }
  });


};

const a = new Top250(`.top`)
a.init()