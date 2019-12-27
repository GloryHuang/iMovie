var request = require('request-promise')

const appID = 'wxb6d80a7e1b3c8012'
const appSecret = 'bc4354046a3e1c900e5e3949b9ed158e'
const grantType = 'authorization_code'

exports.main = async(event, content) => {

  const jsCode = event.code

  return request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSecret}&js_code=${jsCode}&grant_type=${grantType}`, {
    json: true
  }).catch((err) => {
    console.log(err)
  })

}