// pages/order/order.js
// 获取数据库引用
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取订单数据
    db.collection('orderData').get()
    .then(res => {
      console.log(res,'res')
      const arr = JSON.parse(res.data[0].orderCommodity)
      console.log(arr,'arr');
      this.setData({
        orderData : res.data
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