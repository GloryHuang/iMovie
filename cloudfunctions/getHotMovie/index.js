var rquest = require('request-promise')

exports.main = async(event, content) => {
  // http://api.douban.com     ?apikey=0df993c66c0c636e29ecbb5344252a4a
  // `https://douban-api.uieee.com/v2/movie/in_theaters?start=${event.start}&count=${event.count}`
  
  return rquest(`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`).then((res) => {

    return res
  }).catch((err) => {
    console.log(err);
  })

}