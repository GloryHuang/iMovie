//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
      title: '正在热映',
      type: 'inTheaters'
    }, {
      title: '即将上映',
      type: 'comingSoon'
    }],
    movieList: [],
    title: '',
    casts: '',
    currentType: 'inTheaters'
  },
  getMovie(type) {

    var reqType = '';
    if (type == 'inTheaters') {
      reqType = 'getHotMovie'
    } else if (type == 'comingSoon') {
      reqType = 'getSoonMovie'
    }
    wx.showLoading({
      title: '加载中',
    })

    wx.cloud.callFunction({
      // name: 'getHotMovie',
      // name: reqType,
      name: 'API',
      data: {
        type: reqType,
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      var data = res.result
      // console.log(data,'data')
      var movielist = data.subjects
      var title = data.title.slice(0, 4)
      // console.log(movielist)


      this.setData({
        movieList: this.data.movieList.concat(movielist),
        title: title
      });
      wx.stopPullDownRefresh()
      console.log(this.data.movieList)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })

  },
  switchTab(event) {
    let type = event.currentTarget.dataset.type
    this.setData({
      movieList: [],
      title: '',
      casts: '',
      currentType: type
    })

    this.getMovie(this.data.currentType)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovie(this.data.currentType)


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
      movieList: [],
      title: ''

    })
    // this.getMovie();
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getMovie(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})