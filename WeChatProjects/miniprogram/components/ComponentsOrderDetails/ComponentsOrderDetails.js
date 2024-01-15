// components/Components.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      value: []
    },
    totalPrices: {
      type: Number,
      value: 0
    },
    favorable: {
      type: Number,
      value: 0
    },
    fullPrice: {
      type: Number,
      value: 0
    },
    a:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  // 在组件实例刚刚被创建时执行
  created: function (params) {
    console.log(params.totalPrices, 'params.totalPrices')
    console.log(params.cartList, 'params.cartList')
    this.setData({
      cartList: params.cartList,
      totalPrices: params.totalPrices,
      favorable: params.favorable,
      fullPrice: params.fullPrice
    })
  }
})
