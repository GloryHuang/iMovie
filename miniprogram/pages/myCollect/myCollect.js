// miniprogram/pages/myCollect/myCollect.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    collectList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  getList() {
    wx.cloud.callFunction({
      name: 'JDBC',
      data: {
        table: 'user_collect',
        type: 'get',
        condition: {
          _openid: app.globalData.openId
        }
      }
    }).then(res => {
      console.log(res)

      var isShow
      if (res.result.data.length != 0) {
        isShow = true
      } else {
        isShow = false
      }


      this.setData({
        collectList: res.result.data,
        isShow: isShow
      })
      wx.stopPullDownRefresh()
    })


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
    this.onLoad();
    this.getList()
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
      collectList: []
    })

    this.getList()
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