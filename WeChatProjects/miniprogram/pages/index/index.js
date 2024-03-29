// index.js
// const app = getApp()
// 获取数据库引用
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeSwiper: "",
    homeList: ""
  },
  // 获取首页数据
  getHomeData () {
    // 获取轮播图数据库集合
    db.collection('homeShowList').get({
      success: res => {
        this.setData({
          homeSwiper : res.data
        })
      }
    }),
    // 获取商品展示图
    db.collection('homeShowList2').get({
      success: res => {
        this.setData({
          homeList : res.data
        })
      }
    })
  },
  // 开启点餐按钮
  menuOpen () {
    console.log('开启点餐')
    wx.navigateTo({
      url: '../menu/menu'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
