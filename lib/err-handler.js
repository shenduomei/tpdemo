/**
 * 错误处理
 * @author Changefeng
 */
var logger = require('./log4js').getLogger('base-router');

module.exports = {

	/**
	 * 该邮箱已经被注册
	 * res: 客户端响应
	 */
	emailUsedParams : function(res) {
		logger.info('emailused params');
		res.send({
			rsp_code: 'fail',
			error_code: 'email used',
			error_msg: '邮箱已注册不能重复注册'
		});
		res.end();
	},

	/**
	 * 参数缺失
	 * res: 客户端响应
	 */
	incompleteParams : function(res) {
		logger.info('incomplete params');
		res.send({
			rsp_code: 'fail',
			error_code: 'incomplete params',
			error_msg: '参数缺失'
		});
		res.end();
	},

	/**
	 * 非法参数
	 * res: 客户端响应
	 */
	invalidParams : function(res) {
		logger.info('invalid params');
		res.send({
			rsp_code: 'fail',
			error_code: 'invalid params',
			error_msg: '非法参数'
		});
		res.end();
	},
	/**
	 * 账号不存在
	 * res: 客户端响应
	 */
	adminnotfind : function(res) {
		logger.info('admin not find');
		res.send({
			rsp_code: 'fail',
			error_code: 'admin not find',
			error_msg: '账号不存在'
		});
		res.end();
	},

	/**
	 * 非法签名
	 * res: 客户端响应
	 */
	invalidSign : function(res) {
		res.send({
			rsp_code: 'fail',
			error_code: 'invalid sign',
			error_msg: '非法签名'
		});
		res.end();
	},

	/**
	 * token错误
	 * res: 客户端响应
	 */
	TokenError : function(res) {
		logger.info('invalid token');
		res.send({
			rsp_code: 'fail',
			error_code: 'invalid token',
			error_msg: '无效的token'
		});
		res.end();
	},

	/**
	 * user_token错误
	 * res: 客户端响应
	 */
	userTokenError : function(res) {
		logger.info('invalid user_token');
		res.send({
			rsp_code: 'fail',
			error_code: 'invalid user_token',
			error_msg: '无效的user_token'
		});
		res.end();
	},

	/**
	 * 更新投票记录错误
	 * res: 客户端响应
	 */
	updataVote : function(res) {
		logger.info('updataVote failer');
		res.send({
			rsp_code: 'fail',
			error_code: 'updataVote failer',
			error_msg: '更新失败'
		});
		res.end();
	},


	/**
	 * 系统错误
	 * res: 客户端响应
	 */
	systemError : function(res, error) {
		logger.error('SYSTEM ERROR:' + error);
		res.send({
			rsp_code: 'fail',
			error_code: 'system error',
			error_msg: '系统错误'
		});
		res.end();
	},

	renderErrorPage: function(res, error, errorMsg) {
		logger.error('RENDER ERROR PAGE:' + error);
		res.render('error-mobile', {
			message: errorMsg || '访问量激增，服务器君顶不住啦 : ('
		});
	},

	appNotFound : function(res) {
		res.send({
			rsp_code : 'fail',
			error_code : 'app_not_found',
			error_msg : '应用不存在'
		});
		res.end();
	}

}
