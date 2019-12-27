// pages/userConsole/userConsole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    opid: '',
    firstMenu: [{
      title: '我的想看',
      url: '/pages/myCollect/myCollect'
    }],
    secondMenu: ['分享给朋友', '联系我们', '反馈', '关于']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo)
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
    // })

    var that = this;
    wx.login({
      success: function(e) {

        wx.cloud.callFunction({
          name: 'getOpenID',
          data: {
            code: e.code
          }
        }).then(res => {
          let result = res.result
          console.log(result)
          that.setData({
            opid: result.openid
          })

          console.log(that.data.opid)
        }).catch(err => {
          console.log(err)
        })
      }
    })


  },
  bindGetUserInfo(e) {
    // console.log(e.detail.userInfo)

    // wx.login({
    //   success: function(e) {
    //     console.log('======', e.code)
    //     // jsCode = e.code
    //     console.log('======')
    //     wx.request({
    //       url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxb6d80a7e1b3c8012&secret=bc4354046a3e1c900e5e3949b9ed158e&js_code=${e.code}&grant_type=authorization_code`,
    //       method: 'GET',
    //       success(res) {
    //         console.log(res)

    //       }
    //     })
    //   }
    // })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})