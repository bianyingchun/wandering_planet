// miniprogram/pages/invite/invite.js
const open_id = 6;
const  dbms = require('../../common/dbms');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helped:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({serial_num:parseInt(options.serial_num), score:parseInt(options.score), rank: parseInt(options.rank),from_id:options.from_id});
    this.check_helped();
    // this.setData({serial_num:options.serial_num, num:options.num, rank: options.rank,from_id:options.from_id})
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

  },

  onhelp() {
    var self = this;
    var score = self.data.score;
    this.setData({score: score + 50, helped:true});
    dbms.update_score(self.data.from_id, score+50, this.data.rank, open_id).then(res => {
      console.log(res)
        this.setData({rank:res})
    }).catch(console.err);
  },

  check_helped() { 
    dbms.check_helped(this.data.from_id, open_id)
    .then( res => {
      this.setData({helped:res});
    })
    .catch(console.err)
  }
})