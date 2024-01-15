// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const Y = event.date.getFullYear() + '-'
  // const M = (event.date.getMonth()+1 < 10 ? '0'+(event.date.getMonth()+1) : event.date.getMonth()+1) + '-'
  // const D = event.date.getDate() + ' '
  // const h = event.date.getHours() + ':'
  // const m = event.date.getMinutes() + ':'
  // const s = event.date.getSeconds()
  return Y
}