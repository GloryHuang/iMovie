// miniprogram/pages/photosList/photosList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    photoslist: [],
    photoNum: '',
    hasMore: false, 
    startNum: 0, 
    countNum: 28, 
    showLoding: false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (this.data.photoslist.length == 24) {
      this.setData({
        showLoding: false
      })

    } 
    

    this.setData({
      id: options.id
    })
    this.getPhotos(this.data.id)
  },
  getPhotos(id) {

    wx.cloud.callFunction({
      name:'API',

      data: {
        type: 'getPhotos',
        id: id,
        start: 0,
        count: this.data.countNum 

      }
    }).then(res => {

      var list = res.result.photos

      let photoNum = res.result.total 
      let hasMore = this.data.photoslist.length <= photoNum



      if (this.data.photoslist.length <= photoNum) { 
 
        var result = list.filter(item1 => { 
          return this.data.photoslist.filter(item2 => { 
            return item1.id != item2.id 
          }) 
        }) 
 

 
        this.setData({ 
          photoslist: result, 
          photoNum: photoNum, 
          showLoding: true, 
          hasMore: hasMore, 
          countNum: this.data.countNum + this.data.countNum 
        }) 
         
      }  
 
      if (this.data.photoslist.length >= photoNum){ 
        this.setData({ 
          hasMore:false 
        }) 
      } 



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