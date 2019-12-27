// miniprogram/pages/rating/rating.js
const utils = require('../../utils/util.js')
Page({



  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    title: '',
    openid: '',
    content: '',
    normalSrc: '/images/icon/star-no.png',
    selectedSrc: '/images/icon/star-full.png',
    halfSrc: '/images/icon/star-half.png',
    rating: 0,
    scoreTitle: ''
  },

  tapLeftStar(e) {
    let score = e.currentTarget.dataset.score

    if (this.data.rating == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0.5
    }
    // let scoreTitle = switchDescript(score)
    this.setData({
      rating: score,
      scoreTitle: this.switchDescript(score)
    })


  },
  tapRightStar(e) {
    let score = e.currentTarget.dataset.score

    this.setData({
      rating: score,
      scoreTitle: this.switchDescript(score)
    })
  },
  switchDescript(rating) {
    if (rating == 0.5 || rating == 1) {
      return '超烂啊'
    }
    if (rating == 1.5 || rating == 2) {
      return '比较差'
    }
    if (rating == 2.5 || rating == 3) {
      return '一般般'
    }
    if (rating == 3.5 || rating == 4) {
      return '比较好'
    }
    if (rating == 4.5 || rating == 5) {
      return '棒极了'
    }
  },
  getContent(e) {

    this.setData({
      content: e.detail.value
    })
  },
  submitScore(e) {
    console.log()
    let scoreDetail = e.currentTarget.dataset
    console.log(scoreDetail.score)
    if (scoreDetail.score != "0分") {
      // console.log('1')
      wx.cloud.callFunction({
        name: 'JDBC',
        data: {
          table: 'user_comment',
          type: 'add',
          data: {
            id: this.data.movieId,
            title: this.data.title,
            date: utils.formatTime(new Date()),
            _openid: this.data.openid,
            rating: this.data.rating,
            scoreTitle: this.data.scoreTitle,
            commtent_content: this.data.content,
            has_rating: true
          },
          success: (res) => {
            console.log(res)
          }
        }
      })
      wx.showToast({
        title: '添加评分成功',
        icon: 'none'
      })
      setTimeout(function() {
        let pages = getCurrentPages()
        let prevPages = pages[pages.length - 2]
        prevPages.setData({
          score: scoreDetail,
          has_rating: true
        })
        wx.navigateBack({
          delta: 1
        })
      }, 2000)

    }else{
      wx.showToast({
        title: '请选择评分后提交',
        icon:'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      movieId: options.id,
      title: options.title,
      openid: options.openid
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