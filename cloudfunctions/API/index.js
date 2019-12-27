// 云函数入口文件
const cloud = require('wx-server-sdk')
const rquest = require('request-promise')
cloud.init()



// 云函数入口函数
exports.main = async(event, context) => {

  try {

    if (event.type == 'getHotMovie') {
      return await rquest(`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`, {
        json: true
      })
    }

    if (event.type == 'getSoonMovie') {
      return await rquest(`http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a`, {
        json: true
      })
    }

    if (event.type == 'getComment') {
      return await rquest(`http://api.douban.com/v2/movie/subject/${event.id}/comments?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`, {
        json: true
      })
    }

    if (event.type == 'getMovieInfo') {
      return await rquest(`http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`, {
        json: true
      })
    }

    if (event.type == 'getPhotos') {

      return await rquest(`http://api.douban.com/v2/movie/subject/${event.id}/photos?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`, {
        json: true
      })

    }
  } catch (err) {
    console.log(err)
  }

}