$("ul li").click(function() {
  let $index = $(this).index()
  $(this).addClass("active").siblings().removeClass("active")
  $(`section`).hide().eq($index).fadeIn()
}).eq(0).click()

///////////////***********//////////////////

function Top250(wrap) {
  this.wrap = $(wrap);
  this.index = 0;
  this.count = 10;
  this.loading = false;
  this.isFinished = false
}

Top250.prototype.init = function(argument) {
  this.getData()
  this.bindEvents()
};

Top250.prototype.getData = function() {
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
      this.wrap.find(".container").append(this.createNode(ele))
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




///////////////***********//////////////////

function Us(wrap) {
  this.wrap = $(wrap)
}

Us.prototype.init = function() {
  this.getData()
}
Us.prototype.getData = function() {
  this.wrap.find(`.loading`).addClass('a')
  $.ajax({
    type: "get",
    url: "https://api.douban.com/v2/movie/us_box",
    dataType: "jsonp"
  }).done((json) => {
    json.subjects.forEach((ele, index) => {
      this.wrap.find(".container").append(this.createNode(ele.subject))
    })
  }).fail(() => {
    console.log("error");
  }).always(() => {
    this.wrap.find(`.loading`).removeClass("a")
  })
}
Us.prototype.createNode = function(movie) {
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

///////////////***********//////////////////
function Search(wrap) {
  this.wrap = $(wrap)
  this.btn = this.wrap.find(`.btn`)

}
Search.prototype.init = function() {
  this.bindEvents()
}
Search.prototype.getData = function(keyword) {
  this.wrap.find(`.loading`).addClass('a')
  $.ajax({
    type: "get",
    url: "https://api.douban.com/v2/movie/search",
    data:{
      q: keyword
    },
    dataType: "jsonp"
  }).done((json) => {
    console.log(json.subjects)
    json.subjects.forEach((ele, index) => {
      this.wrap.find(".container").append(this.createNode(ele))
    })
  }).fail(() => {
    console.log("error");
  }).always(() => {
    this.wrap.find(`.loading`).removeClass("a")
  })
}
Search.prototype.createNode = function(movie) {
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
Search.prototype.bindEvents = function() {
  this.btn.click(()=>{
    this.wrap.find(`.container`).empty()
    let key = this.wrap.find("input[type=search]").val()
    if(key==="")return;
    this.getData(key)
  })

}



const a = new Top250(`.top`)
const b = new Us(`.us`)
const c = new Search(`.search`)
c.init()
a.init()
b.init()