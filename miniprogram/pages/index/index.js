//index.js
const app = getApp()
const WHOLE_WIDTH = 600;
const PER_WIDTH = 2;
Page({
  data: {
    num:0,
    count_down:30,
    progress:1,
  },

  onLoad: function() {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        } 
        // else {
        //   wx.authorize({
        //     scope:'scope.userInfo',
        //     success(res) {
        //       console.log(res,'authorize---')
        //     }
        //   })
        // }
      }
    })

    this.init_game();
  },

  init_game() {
    this.gameover = false;
    this.gamestart = true;
  },

  on_lighten_up() {
    if(this.gameover) return;
    if(this.gamestart) {
      this.update_game();
    }
    var num = this.data.num;
    this.setData({num: num+20});
  },

  update_game() {
    this.gamestart = false;
    var num = 300;
    var timer = setInterval( () => {
      num--;
      this.setData({count_down: Math.floor(num/10), progress: num/300});
      if(num <= 0) {
        this.gameover = true;
        clearInterval(timer)
      }
    },100)
  },

  onGetUserInfo(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid() {
      wx.cloud.callFunction({
      name: 'login',
      data: {},
      success(res) {
        app.globalData.openid = res.result.openid;
      }
    });
  },
  check_is_old_user() {

  },

  record_num() {
    var db = wx.cloud.database();
    db.collection('todos').add({
      data:{
        userInfo:this.data.userInfo,
        _id:app.global.openid,
        num:this.data.num
      }
    })
  }
  
})
