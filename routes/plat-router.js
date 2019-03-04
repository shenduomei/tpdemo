

let express = require('express');
let router = express.Router();
let WebSocketServer  =require('ws').Server;
let logger = require('../lib/log4js').getLogger('member-router');
const appConfig = require('../config/config');
const errHandler = require('../lib/err-handler');
const bizUtils = require('../lib/biz-utils');
const platuser = require('../model/plat/user');
const elected = require('../model/c/elected');
const vote = require('../model/plat/vote');
const succ = require('../lib/succ');
const redisClient = require('../lib/redis');

/*
 * 平台管理
 */
router.get('/', function (req, res, next) {
	res.render('c/platlogin.html');
});


/**
 *平台用户登录
 *@username  用户名
 *@password 密码 
 */
router.post('/platlogin', function (req, res, next) {
	const { username, password } = req.body;
	if (!username || !password) {
		errHandler.incompleteParams(res);
	}
	async function platlogin() {
		let findResult = await bizUtils.find(platuser, { username });
		//如果账号不存在
		if (findResult.length == 0) {
			// errHandler.adminnotfind(res);
			//因为是后台管理系统 一般情况账号密码都是工作人员自己配置的  没有注册功能  下面注释的是注册功能
			let result = await bizUtils.create(platuser, { username, password });
			let token = bizUtils.generactorToken({ username: username });
			let cacheKey = token.split('.')[0];
			redisClient.add(cacheKey, token, appConfig.tokenRedis.maxAge);
			let data = {
				user: {
					username: result.username
				},
				token: token
			}
			succ.loginSucc(res, data);
		} else { //账号存在
			if (findResult[0].password == password) {//密码验证
				let token = bizUtils.generactorToken({ username: username });
				let cacheKey = token.split('.')[0];
				redisClient.add(cacheKey, token, appConfig.tokenRedis.maxAge);
				let data = {
					user: {
						username: findResult[0].username
					},
					token: token
				}
				succ.loginSucc(res, data);
			}
		}


	}

	platlogin();
})


/**
 *平台管理人员对投票人员的控制
 */
router.get('/curd', function (req, res, next) {
   async function getvote() {
	   let result = await bizUtils.find(vote,{});
	   if(result.length == 0 || result[0].vote == false) {
		res.render("c/platcurd.html",{vote:"true"});
	   }  else {
		res.render("c/platcurd.html",{vote:"false"});
	   }
   }
   getvote();
  
})


/**
 *平台管理人员打开投票
 */
router.post('/start', function (req, res, next) {
	const {username} = req.body;
	if(!username) {
		errHandler.incompleteParams(res);
	}
	async function start() {
		let result = await bizUtils.find(vote,{});
		if(result.length == 0) {
			result = await bizUtils.create(vote,{'vote':true,"username":username});
		} else {
			result = await bizUtils.update(vote,{'vote':true,"username":username});
		}
		succ.voteStart(res,{"vote":true})
		//let ws = new WebSocketServer({port:8080});
		//console.log(ws.on("connection",function(ws) {}))
	}
	start();
})

/**
 *平台管理人员关闭投票
 */
router.post('/end', function (req, res, next) {
	 const {username} = req.body;
	 if(!username)  {
        errHandler.incompleteParams(res);
	 }
	async function end() {
		try {
			let result = await bizUtils.find(vote,{'vote':true});
			if(result.length != 0) {
				result = await bizUtils.update(vote,({'vote':true},{"$set":{"vote":false,"username":username}}))
			} else {
				result = await bizUtils.create(vote,{"vote":false,"username":username});
			}
			succ.voteNostart(res,{"vote":false})
		} catch(err) {
			console.log(err)
		}
	}
	end();
})


/**
 *获取投票是否开始
 */
router.post('/isstart', function (req, res, next) {

	async function isstart() {
		let result = await bizUtils.find(vote,{});
		if(result.length == 0 || result[0].vote == false) {
			let data = {
				vote: false
			}
			succ.voteNostart(res,data);
		} 
		let data = {
			vote: true
		}
		succ.voteStart(res,data)
		//let ws = new WebSocketServer({port:8080});
		//console.log(ws.on("connection",function(ws) {}))
	}
	isstart();
})


/**
 *添加被选举对象
 * @user 被选举对象
 */
router.post('/addvotes', function (req, res, next) {
	const {user} = req.body;
	if(!user) {
		errHandler.incompleteParams(res);
	}
	async function addvotes() {
		let result = await bizUtils.find(elected,({"user":user}));
		if(result.length == 0) {
			result = await bizUtils.create(elected,({"user":user}));
		}
	    succ.addElected(res,result);
	}
	addvotes()
})


/**
 *删除被选举对象
 * @user 被选举对象
 */
router.post('/delvotes', function (req, res, next) {
	const {user} = req.body;
	if(!user) {
		errHandler.incompleteParams(res);
	}
	async function delvotes() {
		let result = await bizUtils.del(elected,({"user":user}));
		succ.delElected(res,{})
	}
	delvotes()
})

/**
 *查询被选举对象的投票数量
 * @user 被选举对象
 */
router.post('/findvotes', function (req, res, next) {
	const {user} = req.body;
	if(!user) {
		errHandler.incompleteParams(res);
	}
	async function delvotes() {
		let result = await bizUtils.find(elected,({"user":user}));
		succ.findVote(res,result)
	}
	delvotes()
})



module.exports = router;