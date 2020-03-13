// miniprogram/pages/comments/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comtlist: [],
    id: '',
    cmt_count: '',
    hasMore: true,
    title: '',
    hasComt: true
  },
  getCmtList(id) {

    wx.cloud.callFunction({
      name: 'API',
      data: {
        type: 'getComment',
        id: id,
        start: this.data.comtlist.length,
        count: 10
      }
    }).then(res => {
      var data = res.result;
      var hasComt
      console.log(data)
      var hasMore = this.data.comtlist.length < this.data.cmt_count
      console.log(this.data.comtlist.length, this.data.cmt_count)
      if (data.total <= 10) {
        hasMore = false
      }
      if (data.comments.length != 0) {
        hasComt = true
      }
      this.setData({
        comtlist: this.data.comtlist.concat(data.comments),
        hasMore: hasMore,
        title: data.subject.title,
        hasComt: hasComt
      });
      wx.setNavigationBarTitle({
        title: '观众评论-' + this.data.title,
      })
      wx.stopPullDownRefresh()

    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      cmt_count: options.count
    })
    this.getCmtList(this.data.id)




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
    // this.getCmtList(this.data.id)


    this.setData({
      comtlist: []
    })
    this.getCmtList(this.data.id)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getCmtList(this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})