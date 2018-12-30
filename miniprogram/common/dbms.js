const db = wx.cloud.database()
const _ = db.command;
var dbms = {};
dbms.get_next_rank = function(score) {
  return new Promise((resolve, reject) => {
    db.collection('users').where({score:_.lt(score)}).orderBy('score', 'desc').limit(1).get().then(resolve).catch(reject)
  });
}

dbms.get_prev_rank = function(score) {
  return new Promise((resolve, reject) => {
    db.collection('users').where({score:_.gte(score)}).orderBy('score','asc').limit(1).get().then(resolve).catch(reject)
  });
}

dbms.add_user = function(doc) {
  return new Promise((resolve, reject) => {
    db.collection('users').add({
        data:doc
      }).then(resolve).catch(reject)
    })
}

dbms.get_top_rank = function(doc) {
  return new Promise((resolve, reject) => {
    db.collection('users').orderBy('rank', 'asc').limit(10).get().then(resolve).catch(reject)
  })
}

dbms.get_user_rank = function(rank) {
  rank = Math.max(1, rank - 4);
  return new Promise( (resolve, reject) => {
    db.collection('users').where({rank: _.gte(rank)}).orderBy('rank','asc').limit(10).get().then(resolve).catch(reject);
  })
}
//考虑用Promise.all()
dbms.update_score = function(user_id, score, old_rank, helper) {
  var self = this;
  var update_obj = {score:score};
  var rank = old_rank;
  if(helper) update_obj.helper = _.push(helper);
  return new Promise ((resolve, reject) => {
    self.get_prev_rank(score).then(res =>{
      console.log('update_score', res)
      rank = res.data.length? res.data[0].rank+1 : 1;
      if(rank === old_rank){
        return Promise.resolve();
      } else {
        update_obj.rank = rank;
        return wx.cloud.callFunction({
          name: 'update_rank2',
          data: {query:{rank:_.and(_.gte(rank), _.lt(old_rank)), _id:_.neq(user_id)}, update :{rank:_.inc(1)}}    
        });
      }
    })
    .then(res => {
      return db.collection('users').doc(user_id).update({data:update_obj})
    })
    .then( () => { resolve(rank)})
    .catch(reject)    
  })
}

dbms.check_helped = function(user_id, helper) {
  var self = this;
  return new Promise((resolve, reject) => {
    db.collection('users').doc(user_id).get()
    .then(res => { 
      if(res.data.helper && res.data.helper.indexOf(helper)!==-1) {
        resolve(true)
      } else {
        resolve(false) 
      }
    })
    .catch(reject);
  })
}

dbms.add_record = function(record) {
  var self = this;
  var score = record.score;
  return new Promise((resolve, reject) => {
    self.get_next_rank(score)
    .then((res) => {
      res = res.data;
      if(!res.length) {
        return self.get_prev_rank(score).then( res=> {
          record.rank = res.data.length? res.data[0].rank+1 : 1;
          return self.add_user(record)
        })
      } else {
        record.rank = res[0].rank;
        return self.add_user(record)
      }
    })
    .then( res => {
      return wx.cloud.callFunction({
        name: 'update_rank',
        data: {score:score}    
      });
    })
    .then(resolve)
    .catch(reject)
  }) 
}

module.exports = dbms;