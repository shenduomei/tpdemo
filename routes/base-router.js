





let express = require('express');
let router = express.Router();
let md5 = require('md5');
let nodemailer = require('nodemailer');
let jwt = require('jsonwebtoken');
let appConfig = require('../config/config');
let logger = require('../lib/log4js').getLogger('base-router');
let errHandler = require('../lib/err-handler');
let bizUtils = require('../lib/biz-utils');
let { Schema } = require('mongoose');
let User = require('../model/c/user');
let redisClient = require('../lib/redis');
let succ = require('../lib/succ');
// let electedPerson = require('../config/electedPerson');
const vote = require('../model/plat/vote');
const elected = require('../model/c/elected');
/**
 * 注册页面
  */

router.get('/main', function (req, res, next) {
	res.render("c/user/vip.html")
})
/**
 * 进入投票页面
 * @params token
  */
 router.get('/vote',function(req,res,next) {
	 async function findElected() {
        try {
			let result = await bizUtils.find(elected,{});
		    res.render('c/user/deal.html',{
				electedPerson:result,
				total:result.length
			})
		   } catch(err) {
			errHandler.TokenError(res);
		   }
	 }
	 findElected();
	   
	})
	
	/**
 * 获取投票是否结束
 * @params token
  */
 router.post('/vote/isstart',function(req,res,next) {
	async function isstart() {
		try {
			let result = await bizUtils.find(vote,{});
			if(result.length == 0 || result[0].vote == false) {
				let data = {
					vote: false
				}
				succ.voteNostart(res,data);
			} else {
				let data = {
					vote: true
				}
				succ.voteStart(res,data)
			} 
			
		}
		catch(err) {
			console.log(err)
		}
		
	}
	isstart();
})

	/**
 * 更新投票的的结果
 * @params votes [] 投票的对象
  */
 router.post('/updatavote',function(req,res,next) {
	 const {votes} = req.body;
	 if(!votes) {
		 errHandler.incompleteParams(res);
	 }
	 try {
		 let result = null;
       for(let v of votes) {
		   bizUtils.update(elected,`{_id:${v}},{$addToSet:{'vote':${req.email}}}`);
		   elected.update({"_id":v},{$addToSet:{"vote":req.email}},function(err,data) {
              if(err) {
				  errHandler.updataVote(res,{});
			  }
		   })
	   }
	   succ.updateVote(res,{});
	}catch(err) {
		 console.log(err)
	 }
	 
})
/**
 * 注册接口
 * @params email邮箱号码
*/
router.post('/register', function (req, res, next) {
	try {
		let { email } = req.body;
		logger.info("注册开始 %::%", email);
		//首先进行邮箱授权码的获取以qq邮箱为例 在设置里面找到账户开启服务POP3/SMTP服务,并生成授权码,现在获取授权码需要验证手机号等
		let transporter = nodemailer.createTransport({
			service: 'qq',
			auth: {
				user: '',
				pass: '' //授权码,通过QQ获取

			}
		});
		let mailOptions = {
			from: '', // 发送者
			to: email, // 接受者,可以同时发送多个,以逗号隔开
			subject: '邮箱注册账号确认', // 标题
			html: `该邮箱已注册了平台的投票系统`//这个地方可以放一个a连接 在邮箱里面点击连接激活账号（建议）
		};
        transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				console.log(err);
				return;
			}
			//邮件发送成功进行数据库存储
			let token = bizUtils.generactorToken({email});
            async function re() {
				try {
					let result = await bizUtils.find(User,{email});
					if(result.length == 0) {
						//插入数据库
						let result = await bizUtils.create(User,{email,password:md5("123456")});
						let cacheKey = token.split('.')[0];
						redisClient.add(cacheKey,token,appConfig.tokenRedis.maxAge);
						let data = {
							user:{
								email:result.email,
							},
							token:token
						}
					    succ.registerSucc(res,data);
					} else {
						errHandler.emailUsedParams(res);
					}
				} catch(err) {
					console.log(err);
				}
	
			}
			re();
			
		});

		

		
	} catch (e) {
		errHandler.systemError(res, e);
		return;
	}

});



module.exports = router;
