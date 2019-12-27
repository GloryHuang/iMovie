// miniprogram/pages/previewList/previewList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: {},
    selectIndex: '0',
    title: '',
    videosrc: ''
  },
  getMovieInfo(num) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      // name: 'getMovieInfo',
      name:'API',
      data: {
        type:'getMovieInfo',
        id: num
      }
    }).then(res => {
      var resl = res.result
      // console.log(resl)
      wx.setNavigationBarTitle({
        title: resl.trailers[0].title,
      })

      this.setData({
        movieInfo: resl,
        title: resl.trailers[0].title,
        videosrc: resl.trailers[0].resource_url
      })
      console.log(this.data.movieInfo)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)

      wx.hideLoading()
    })
  },
  selected(event) {
    console.log(event)
    // console.log(event.currentTarget.dataset.index)
    let index = event.currentTarget.dataset.index
    this.setData({
      selectIndex: index,
      title: this.data.movieInfo.trailers[index].title,
      videosrc: this.data.movieInfo.trailers[index].resource_url
    })
    wx.setNavigationBarTitle({
      title: this.data.movieInfo.trailers[index].title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieInfo(options.id)
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