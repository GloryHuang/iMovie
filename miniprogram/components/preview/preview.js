// components/preview/preview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieInfo: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    movieInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

    previewImage(event) {
      let current = event.currentTarget.dataset.index
      console.log(current)
      if (this.data.movieInfo.photos) {
        var imgList = []
        var photos = this.data.movieInfo.photos
        for (var i = 0; i < photos.length; i++) {
          imgList.push(photos[i].image)
        }

      }

      wx.previewImage({
        current: imgList[current],
        urls: imgList
      })
    }
  }
})