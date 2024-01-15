// pages/order2/order2.js
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
    orderTime: 0
  },
  // 获取当前时间并格式处理
  formatDate() {
    console.log('formatDate')
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    console.log(formattedDate)
    return formattedDate
  },
  // 支付
  payHandle () {
    const orderCommodity = JSON.stringify(this.data.cartList)
    const orderTotalPrices = this.data.totalPrices
    const orderFavorable = this.data.favorable
    const orderFullPrice = this.data.fullPrice
    const orderRemarkText = this.data.remarkText
    const orderTime = this.data.orderTime
    const payTime = this.formatDate()
    // 提交订单到数据库
    console.log('订单提交至数据库')
    db.collection('orderData').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        orderCommodity: orderCommodity,
        orderTotalPrices: orderTotalPrices,
        orderFavorable: orderFavorable,
        orderFullPrice: orderFullPrice,
        orderRemarkText: orderRemarkText,
        orderTime: orderTime,
        orderPayTime: payTime
      }
    }).then(res => {
      console.log('成功发送')
      wx.showToast({
        title: '支付成功',
        duration : 1000
      })
    })
    wx.reLaunch({
      url: '/pages/order3/order3?totalPrices='
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let arr1 = JSON.parse(options.cartList)
    this.setData({
      totalPrices: options.totalPrices,
      favorable: options.favorable,
      fullPrice: options.fullPrice,
      cartList: arr1,
      orderTime: options.orderTime
    })
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