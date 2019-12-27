var rquest = require('request-promise')

exports.main = async(event, content) => {

  // https://douban-api.uieee.com/v2/movie/coming_soon
  // https://douban-api.uieee.com/v2/movie/coming_soon
  // https: //douban-api.zce.now.sh
  // http://api.douban.com     ?apikey=0df993c66c0c636e29ecbb5344252a4a

  return rquest(`http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((res) => {

    return res
  }).catch((err) => {
    console.log(err);
  })

}