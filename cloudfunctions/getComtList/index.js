// 云函数入口文件
const rquest = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {

  // http://api.douban.com     ?apikey=0df993c66c0c636e29ecbb5344252a4a
  // https://douban.uieee.com/v2/movie/subject/${event.id}/comments?start=${event.start}&count=${event.count}
  
  return rquest(`http://api.douban.com/v2/movie/subject/${event.id}/comments?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`).then(res => {
    return res
  }).catch((err) => {
    console.log(err)
  })

}