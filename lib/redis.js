let redis = require('redis');
let {port,host,db} = require("../config/config").redis;
function Init () {
    let redisClient = redis.createClient(port,host,db);
    this.redisClient = redisClient;
    redisClient.on('error',function(err) {
        console.log("redis连接失败:::",err)
    })
}

Init.prototype.add= function(key,value,expries = 60) {
    this.redisClient.set(key,value);
    if(expries) {
        this.redisClient.set(key,expries);
    }
}
Init.prototype.get = function(key) {
    return this.redisClient.get(key);
}
module.exports = new Init();