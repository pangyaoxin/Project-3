// pages/menu/menu.js
// 云数据库
const db = wx.cloud.database()
// 计算属性 computed 
const computedBehavior = require("miniprogram-computed").behavior

Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    menuData: [],
    toView: '',
    menuIndex: '',
    cartChange: false,
    scroll_height: '',
    scroll_height_cart: '',
    cartList: [],
    cartListLenght: '',
    commodityQuantity: 0,
    fullPrice: 50,
    favorable: 10,
    totalPrices: 0
  },

  // methods
  // 获取菜单列表
  getMenuList () {
    db.collection('menuData').get({
      success: res => {
        this.setData({
          menuData: res.data,
          toView: 'block0',
          menuIndex: 0
        })
      }
    })
  },
  // 点击左边菜单跳到该菜单商品列表
  navChange (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      menuIndex : index ,
      toView : 'block' + index
    })
  },
  // 获取当前可用窗口的高度
  getScrollHeight () {
    const h = wx.getSystemInfoSync().windowHeight
    const w = wx.getSystemInfoSync().windowWidth
    // 减去顶部和底部购物车的高
    const height = 750*h/w-230
    const heightCart = 750*h/w-630
    this.setData({
      scroll_height: height,
      scroll_height_cart : heightCart
    })
  },
  // 添加商品进购物车
  cartAdd (e) {
    let value = e.currentTarget.dataset.value
    let cartarr = this.data.cartList
    // 判断购物车是否有当前加入购物车的商品
    // 购物车为空时
    if (cartarr.length === 0) {
      value.quantity++
      cartarr.push(value)
    }else{
      // 购物车不为空时
      for (let i = 0; i < this.data.cartList.length; i++) {
        if (this.data.cartList[i].name === value.name) {
          cartarr[i].quantity++
          break
        }else{
          if (i === this.data.cartList.length -1) {
            value.quantity++
            cartarr.push(value)
            break
          }
        }
      }
    }
    this.setData({
      cartList : cartarr
    })
  },
  // 减去购物车商品
  cartMin (e) {
    let index = e.currentTarget.dataset.index
    let cartarr = this.data.cartList
    console.log(cartarr, 'cartarr')
    cartarr[index].quantity--
    if (cartarr[index].quantity === 0 ) {
      cartarr.splice(index, 1)
      this.setData({
        cartList : cartarr
      })
    }
    if (cartarr.length === 0) {
      this.setData({
        cartChange: false
      })
    }
    this.setData({
      cartList : cartarr
    })
  },
  // 打开或关闭购物车
  cartOpen () {
    if (this.data.cartList.length !== 0) {
      this.setData({
        cartChange: !this.data.cartChange
      })
    }
  },
  // 清空购物车
  removeCat () {
    this.setData({
      cartList: [],
      cartChange: false
    })
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
  // 购物车处理
  handleCart () {
    if (this.data.cartList.length !== 0) {
      const arr = JSON.stringify(this.data.cartList)
      console.log('选好了')
      const orderTime = this.formatDate()
      wx.navigateTo({
        url: '/pages/order2/order2?totalPrices=' + this.data.totalPrices + '&favorable=' + this.data.favorable + '&fullPrice=' + this.data.fullPrice + '&cartList=' + arr + '&orderTime=' + orderTime
      })
    }else{
      wx.showToast({
        title: '购物车是空的',
        icon: 'error'
      })
    }
  },
  // 时间处理
  formatDate() {
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

  computed: {
    // 购物车商品总数
    commodityQuantity: function (data) {
      let num = 0
      for (let index = 0; index < data.cartList.length; index++) {
        const element = data.cartList[index]
        num = num + element.quantity
      }
      return num
    },
    // 购物车商品总价
    totalPrices: function (data) {
      let total = 0
      for (let index = 0; index < data.cartList.length; index++) {
        const element = data.cartList[index];
        total = total + element.price * element.quantity
      }
      // 有满减时
      if (data.fullPrice) {
        if (total > data.fullPrice) {
          total = total - data.favorable
        }
      }
      return total
      // this.setData({
      //   totalPrices : total
      // })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getMenuList (),
    this.getScrollHeight ()
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