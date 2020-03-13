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
    secondMenu: [{
      title: '分享给朋友',
      url: ''
    }, {
      title: '联系我们',
      url: ''
    }, {
      title: '反馈',
      url: ''
    }, {
      title: '关于',
      url: ''
    }],
    isAuthorize: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查看是否授权
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        isAuthorize: true
      })
    }


  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)

  },
  login(e) {
    console.log(e)
    let path = e.currentTarget.dataset.url
    console.log(path)
    if (e.detail.userInfo) {
      this.setData({
        isAuthorize: true
      })
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })

      if (path == 'userConsole') {
        wx.switchTab({
          url: `../../pages/${path}/${path}`
        })
      } else {

        wx.navigateTo({
          url: `../../pages/${path}/${path}`
        })
      }

    } else {
      //用户按了拒绝按钮

      console.log('拒绝')
      return false
    }


    // var that = this
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // that.setData({
    //       //   isAuthorize: true
    //       // })
    //       console.log('已授权')

    //     } else {
    //       var userinfo = wx.getStorageSync('userInfo')
    //       if (!userinfo) {
    //         wx.getUserInfo({
    //           success: res => {
    //             console.log(res)
    //             if (res.errMsg == "getUserInfo:ok") {
    //               wx.setStorage({
    //                 key: 'userInfo',
    //                 data: res.userInfo,
    //               })
    //             }
    //           },
    //           fail() {
    //             console.log('user unlogin')
    //           }
    //         })
    //       }
    //     }
    //   },
    //   fail() {
    //     console.log('456')
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