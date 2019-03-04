/**
 * 工具类
 * @author lettle su
 */
var appConfig = require('../config/config');
var errHandler = require('./err-handler');
var logger = require('./log4js').getLogger('biz-util');
let jwt = require('jsonwebtoken');

module.exports = {

	/**
	 * 合并参数，将后一个参数合并到前一个参数中
	 */
	extend : function() {
		var src, copy, name, options,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length;
		if ( typeof target !== "object" ) {
			target = {};
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) != null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					if ( target === copy ) {
						continue;
					}

					if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	},
	/**
	 *生成token 
	 *data 
	 */
    generactorToken:function(ployer) {
		let token = jwt.sign(ployer,appConfig.jwt.secret,appConfig.jwt.options);
		return token;
	},
	

	/**
	 * 验证token
	 */
	validToken : function(token) {
		try {
			const reslut = jwt.verify(token,appConfig.jwt.secret);
			console.log("validtoken",reslut)
			return reslut;
		}catch(err) {
			console.log(`token 认证失败原因 : ${err.message}`);
			return false;
		}
		
	   
	   
	},
	/**
	 * 数据库增加数据
	 * @collection 集合的名字
	 * @params 需要增加的数据
	 */
	create:function (collection,params) {
		return new Promise(function(resolve,reject) {
		   collection.create(params,function(err,data) {
			   if(err) {
				   reject(err);
			   } else {
				   resolve(data);
			   }
		   })
		})
	},
	/**find
	 * 查找数据
	 * @collection 集合的名字
	 * @params 查询条件
	 */
	find:function(collection,params) {
		return new Promise(function(resolve,reject) {
		   collection.find(params,function(err,data) {
			   if(err) {
				   reject(err);
			   } else {
				   resolve(data);
			   }
		   })
		})
	},

	/**update
	 * 查找数据
	 * @collection 集合的名字
	 * @params 查询条件
	 */
	update:function(collection,params) {
		console.log(params,"params")
		return new Promise(function(resolve,reject) {
		   collection.update(params,function(err,data) {
			   if(err) {
				   reject(err);
			   } else {
				   resolve(data);
			   }
		   })
		})
	},

	/**
	 * 查找数据
	 * @collection 集合的名字
	 * @params 查询条件
	 */
	del:function(collection,params) {
		return new Promise(function(resolve,reject) {
		   collection.remove(params,function(err,data) {
			   if(err) {
				   reject(err);
			   } else {
				   console.log(data)
				   resolve(data);
			   }
		   })
		})
	},


	/**
	 * 生成时间戳
	 */
	builder:function() {
		let tmp = Date.parse( new Date() ).toString();
		tmp = tmp.substr(0,10);
		return tmp;
   }
}
