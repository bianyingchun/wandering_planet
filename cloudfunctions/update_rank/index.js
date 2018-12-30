// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var score = event.score;
  return new Promise((reslove, reject) => {
    db.collection('users').where({score:_.lt(score)}).update({data:{rank:_.inc(1)}}).then(reslove).catch(reject)
  })
}
//-----------------------------
