// pages/order3.js
// 获取数据库引用
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrices: 0,
    favorable: 0,
    fullPrice: 0,
    remarkText: '',
    orderTime: '',
    payTime: ''
  },
  // 点击取餐号
  mealNumber () {
    console.log('取餐号')
    wx.switchTab({
      url: '/pages/order/order'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取数据库最新订单
    db.collection('orderData').limit(1).orderBy("orderPayTime","desc")
    .get()
    .then(res => {
      console.log(res.data[0].orderPayTime,'orderPayTime')
      const arr = JSON.parse(res.data[0].orderCommodity)
      this.setData({
        cartList: arr ,
        totalPrices: res.data[0].orderTotalPrices,
        favorable: res.data[0].orderFavorable,
        fullPrice: res.data[0].orderFullPrice,
        remarkText: res.data[0].orderRemarkText,
        orderTime: res.data[0].orderTime,
        payTime: res.data[0].orderPayTime
      })
    })
    .catch()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})