// miniprogram/pages/rank/rank.js
const dbms = require('../../common/dbms');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    dbms.get_top_rank().then(res => {
      self.setData({top_rank_list:res.data})
      return dbms.get_user_rank(7) 
    }).then( res => {
      self.setData({user_rank_list:res.data})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  add_record() {
    let self = this;
    if(self.is_updating) return;
    self.is_updating = true;
    let score = Math.floor(Math.random()*2000);
    let id = Math.floor(Math.random()*1000)
    let record = {rank:0, score:score, open_id:id, got_last_day_prize: false, nickName:"流浪者"+id, avatarUrl:"../../images/avatar.png"};
    dbms.add_record(record).then( res => {
      console.log('update', res.result);
      self.is_updating = false;
    }).catch(console.log)
  },
})