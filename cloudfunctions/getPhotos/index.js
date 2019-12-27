var request = require('request-promise')


exports.main = async(event, content) => {

  // return console.log(`https://douban-api.now.sh/v2/movie/subject/${event.id}`)
  // https://douban-api.now.sh
  // https://douban.uieee.com 
  // https://douban-api.uieee.com
  // https://douban-api.zce.now.sh

  // http://api.douban.com     ?apikey=0df993c66c0c636e29ecbb5344252a4a


  let options = {
    method: 'GET',
    uri: `http://api.douban.com/v2/movie/subject/${event.id}/photos?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`,
    qs: {
      start: event.start,
      count: event.count
    },
    json: true
  }

  return request(options).then((res) => {
    return res
  }).catch((err) => {
    console.log(err)
  })

}