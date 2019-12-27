// miniprogram/pages/photosList/photosList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    photoslist: [],
    photoNum: '',
    hasMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      id: options.id
    })
    this.getPhotos(this.data.id)
  },
  getPhotos(id) {

    wx.cloud.callFunction({
      // name: 'getPhotos',
      name:'API',
      data: {
        type:'getPhotos',
        id: id,
        start: 0,
        count: 24
      }
    }).then(res => {
      console.log(res.result);
      var list = res.result.photos
      // let photoNum = res.result.total
      let photoNum = 45
      let hasMore = this.data.photoslist.length <= photoNum
      // console.log(this.data.photoslist.length, photoNum)
      // console.log(list,'list')
      // console.log(hasMore)
      this.setData({
        photoslist: this.data.photoslist.concat(list),
        photoNum: photoNum,
        hasMore: hasMore
      })
      wx.setNavigationBarTitle({
        title: res.result.subject.title
      })
    }).catch(err => {
      console.log(err);
    })
  },
  previewImage(event) {
    let index = event.currentTarget.dataset.index
    let photoList = []
    for (var i = 0; i < this.data.photoslist.length; i++) {
      photoList.push(this.data.photoslist[i].image)
    }
    wx.previewImage({
      current: photoList[index],
      urls: photoList
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
    this.getPhotos(this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})