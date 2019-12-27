var request = require('request-promise')


exports.main = async(event, content) => {

  // return console.log(`https://douban-api.now.sh/v2/movie/subject/${event.id}`)
  // https://douban-api.now.sh
  // https://douban.uieee.com 
  // https://douban-api.uieee.com
  // https://douban-api.zce.now.sh

  // http://api.douban.com     ?apikey=0df993c66c0c636e29ecbb5344252a4a

  return request(`http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((res) => {
    return res
  }).catch((err) => {
    console.log(err)
  })

}