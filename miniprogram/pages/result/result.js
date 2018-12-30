// miniprogram/pages/result/result.js
var util = require('../../common/util')
const db = wx.cloud.database()
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score:1026,
    rank:5,
    serial_num:100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (object) {
    var open_id = 246;
    return {
      title:'送你一座行星发动机，我已经点亮了3250座行星发动机，快来帮我点亮更多发动机',
      path:util.stringnify_path('pages/invite/invite', {from_id:open_id, score:this.data.score, rank:this.data.rank, serial_num:this.data.serial_num})
    }
  }
})