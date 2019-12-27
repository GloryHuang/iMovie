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
    loading: true
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
      console.log('===========')
      console.log(res)
      console.log('===========')
      var resl = res.result
      console.log(resl)
      console.log(resl.durations)
      if (resl.durations.length > 0) {
        var countryTime = resl.countries + '/' + resl.durations[0]
      } else {
        var countryTime = resl.countries
      }

      wx.setNavigationBarTitle({
        title: resl.title,
      })

      this.setData({
        movieInfo: resl,
        countryTime: countryTime,
        comtTitle: this.data.comtTitle = '评论',
        movieId: num,
        loading: false
      }, () => {
        wx.getSystemInfo({
          success: res => {
            this.data.screenWidth = res.screenWidth
            // console.log(this.data.screenWidth)
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
  collectHandle(event) {
    wx.createSelectorQuery().select('.long-des .des').boundingClientRect(res => {
      console.log('height')
      console.log(res)
      console.log('height')
    })

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
          console.log('Add success')
          console.log(res)

          that.setData({
            has_collect: true
          })

        },
        fail: err => {
          console.log('Add Error')
        }
      })



      wx.showToast({
        title: '已添加想看',
        icon: 'success'
        // icon: 'none'

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
                  id: movie.id,
                  _openid: app.globalData.openId,
                }
              }
            }).then(res => {


              wx.cloud.callFunction({
                name: 'JDBC',
                data: {
                  table: 'user_comment',
                  type: 'remove',
                  condition: {
                    id: movie.id,
                    _openid: app.globalData.openId,
                  }
                }
              }).then(res => {
                console.log('删除')
                console.log(res)
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



  ratingHandle() {



    // this.setData({
    //   has_rating: true
    // }, () => {

    wx.navigateTo({
      url: '../rating/rating?id=' + this.data.movieId + '&title=' + this.data.movieInfo.title + '&openid=' + app.globalData.openId,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    // })



  },
  getCollectStatus() {
    console.log('**************')
    console.log(app.globalData.openId)
    console.log('**************')
    wx.cloud.callFunction({
      name: 'JDBC',
      data: {
        table: 'user_collect',
        type: 'get',
        condition: {
          _openid: app.globalData.openId,
          id: this.data.movieId
        },
        field: {
          has_collect: true
        }
      }
    }).then(res => {
      console.log(res)
      if (res.result.data.length > 0) {
        let isCollect = res.result.data[0].has_collect
        console.log(res.result.data[0].has_collect)
        console.log('isCollect ' + isCollect)
        this.setData({
          has_collect: isCollect
        })
        console.log('ddddddddd ' + this.data.has_collect)
      } else {
        return console.log('isFalse')
      }
    })

    // db.where({
    //   _openid: 'o_skI4xUC7BAcQLZg0lPHTASZjME',
    //   id: this.data.movieId
    // }).field({
    //   has_collect: true
    // }).get().then(res => {
    //   if (res.data.length > 0) {
    //     let isCollect = res.data[0].has_collect
    //     // console.log(res.data[0].has_collect)
    //     console.log('isCollect ' + isCollect)
    //     this.setData({
    //       has_collect: isCollect
    //     })
    //   } else {
    //     return false
    //   }
    // })


    console.log('has collect :' + this.data.has_collect)

    wx.cloud.callFunction({
      name: 'JDBC',
      data: {
        table: 'user_comment',
        type: 'get',
        condition: {
          _openid: app.globalData.openId,
          id: this.data.movieId
        },
        field: {
          has_rating: true,
          rating: true,
          scoreTitle: true

        }
      }
    }).then(res => {
      console.log('222222222')
      console.log(res)
      console.log('222222222')
      if (res.result.data.length > 0) {

        let isRating = res.result.data[0].has_rating
        let score = {
          score: res.result.data[0].rating + '分',
          scoretitle: res.result.data[0].scoreTitle
        }

        this.setData({
          has_rating: isRating,
          score: score
        })
      }
    })

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
    // console.log(JSON.parse(options.scoreDetail))
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