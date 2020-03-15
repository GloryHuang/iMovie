// // pages/movieInfo/movieInfo.js

const db = wx.cloud.database().collection('user_collect')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: {},
    lineNum: 4,
    showTotalBtn: true,
    isFold: true,
    countryTime: '',
    comtTitle: '',
    director: '导演',
    movieId: '',
    has_collect: false,
    has_rating: false,
    openId: '',
    score: '',
    loading: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasComt: false
  },

  showAll(e) {
    this.setData({
      isFold: !this.data.isFold
    })

  },

  getMovieInfo(num) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'API',
      data: {
        type: 'getMovieInfo',
        id: num
      }
    }).then(res => {
      var resl = res.result
      var hasComt

      if (resl.durations.length > 0) {
        var countryTime = resl.countries + '/' + resl.durations[0]
      } else {
        var countryTime = resl.countries
      }

      wx.setNavigationBarTitle({
        title: resl.title,
      })

      if (resl.popular_comments.length != 0) {
        hasComt = true
      } else {
        hasComt = false
      }

      this.setData({
        movieInfo: resl,
        countryTime: countryTime,
        comtTitle: this.data.comtTitle = '评论',
        movieId: num,
        loading: false,
        hasComt: hasComt
      }, () => {
        wx.getSystemInfo({
          success: res => {
            this.data.screenWidth = res.screenWidth
          }
        })

        wx.hideLoading()

        wx.createSelectorQuery().select('.long-des .des').boundingClientRect(res => {


          //获取文字高度rpx
          let height = res.height * 750 / this.data.screenWidth

          this.setData({
            lineNum: 4,
            showTotalBtn: height > 120 ? true : false

          })

        }).exec()
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }).catch(err => {
      console.log(err)
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
  collectHandle(e) {

    if (e.detail.userInfo) {
      this.collectMovie(e)
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })
    } else {
      console.log('授权取消')
    }

  },



  ratingHandle() {

    var that = this
    wx.getSetting({
      success(res) {

        if (res.authSetting['scope.userInfo']) {

          wx.navigateTo({
            url: '../rating/rating?id=' + that.data.movieId + '&title=' + that.data.movieInfo.title + '&openid=' + app.globalData.openId + '&isRating=' + that.data.has_rating,
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          var userinfo = wx.getStorageSync('userInfo')

          if (!userinfo) {
            wx.getUserInfo({
              success: res => {

                if (res.errMsg == "getUserInfo:ok") {
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.userInfo,
                  })
                }
              },
              fail: err => {
                console.log('err')
              }
            })
          }
        }
      },
      fail(err) {
        console.log('is not Authorize')
      }
    })



  },
  getCollectStatus() {

    wx.cloud.callFunction({
      name: 'JDBC',
      data: {
        table: 'user_collect',
        type: 'get',
        condition: {
          // _openid: app.globalData.openId,
          _id: this.data.movieId + app.globalData.openId
        },
        field: {
          has_collect: true
        }
      }
    }).then(res => {

      if (res.result.data.length > 0) {
        let isCollect = res.result.data[0].has_collect

        this.setData({
          has_collect: isCollect
        })

      }
    })

    console.log('=================')
    console.log(this.data.movieId + app.globalData.openId)
    console.log(app.globalData)
    console.log(app.globalData.openid)
    console.log('=================')
    wx.cloud.callFunction({
      name: 'JDBC',
      data: {
        table: 'user_comment',
        type: 'get',
        condition: {
          _id: this.data.movieId + app.globalData.openId
        },
        field: {
          has_rating: true,
          rating: true,
          scoreTitle: true

        }
      }
    }).then(res => {


      if (res.result.data.length != 0) {

        let isRating = res.result.data[0].has_rating

        let score = {
          score: res.result.data[0].rating,
          scoretitle: res.result.data[0].scoreTitle
        }

        this.setData({
          has_rating: isRating,
          score: score
        })
      }
    })

  },
  collectMovie(event) {

    wx.createSelectorQuery().select('.long-des .des').boundingClientRect(res => {})

    var movie = event.currentTarget.dataset.collect
    var that = this;


    if (!that.data.has_collect) {

      wx.cloud.callFunction({
        name: 'JDBC',
        data: {
          table: 'user_collect',
          type: 'add',
          data: {
            _openid: app.globalData.openId,
            _id: movie.id + app.globalData.openId,
            id: movie.id,
            title: movie.title,
            casts: movie.casts,
            genres: movie.genres,
            images: movie.images,
            mainland_pubdate: movie.mainland_pubdate,
            has_collect: true,
          }
        },
        success: res => {
          that.setData({
            has_collect: true
          })
          console.log('success')
        },
        fail: err => {
          console.log('Add Error')
        }
      })



      wx.showToast({
        title: '已添加想看',
        icon: 'success'

      })
    } else {

      wx.showModal({
        title: '是否取消想看?',
        content: '取消想看相应的评分也会删除',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'JDBC',
              data: {
                table: 'user_collect',
                type: 'remove',
                condition: {
                  _id: movie.id + app.globalData.openId
                  // _openid: app.globalData.openId,
                }
              }
            }).then(res => {

              wx.cloud.callFunction({
                name: 'JDBC',
                data: {
                  table: 'user_comment',
                  type: 'remove',
                  condition: {
                    _id: movie.id + app.globalData.openId
                    // _openid: app.globalData.openId,
                  }
                }
              }).then(res => {
                that.setData({
                  has_collect: false,
                  has_rating: false,
                  score: ''
                })

                wx.showToast({
                  title: '已取消想看',
                  icon: 'success',

                })
              })

            }).catch(err => {
              console.log(err)
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    let id = options.id

    if (options.scoreDetail) {
      let score = JSON.parse(options.scoreDetail)
      this.setData({
        score: score
      })
    }
    this.setData({
      movieId: id

    })

    this.getMovieInfo(options.id)
    this.getCollectStatus(id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    this.video = wx.createVideoContext('MyVideos')

  },
  bindPlay() {
    this.video.play();
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
    // this.setData({
    //   movieInfo: [],
    //   countryTime: '',
    //   comtTitle: '',
    //   director:''

    // })
    // wx.setNavigationBarTitle({
    //   title:'',
    // })
    // this.getMovieInfo(this.data.movieId)
    // console.log(this.data.movieId)
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