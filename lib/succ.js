/**
 * 错误处理
 * @author Changefeng
 */
var logger = require('./log4js').getLogger('base-router');

module.exports = {

	/**
	 * 注册成功
	 * res: 客户端响应
	 */
	registerSucc : function(res,data) {
		logger.info('register params');
		res.send({
			rsp_code: 'succ',
			succ_code: 'register success',
			succ_msg: data
		});
		res.end();
	},

	/**
	 * 登录成功
	 * res: 客户端响应
	 */
	loginSucc : function(res,data) {
		logger.info('login success');
		res.send({
			rsp_code: 'succ',
			succ_code: 'login success',
			succ_msg: data
		});
		res.end();
	},

	/**
	 * 投票未开始
	 * res: 客户端响应
	 */
	voteNostart : function(res,data) {
		logger.info('vote no start');
		res.send({
			rsp_code: 'succ',
			succ_code: 'vote no start',
			succ_msg: data
		});
		res.end();
	},

	/**
	 * 投票开始
	 * res: 客户端响应
	 */
	voteStart : function(res,data) {
		logger.info('vote start');
		res.send({
			rsp_code: 'succ',
			succ_code: 'vote start',
			succ_msg: data
		});
		res.end();
	},
	/**
	 * 被选举人添加成功
	 * res: 客户端响应
	 */
	addElected : function(res,data) {
		logger.info('addElected success');
		res.send({
			rsp_code: 'succ',
			succ_code: 'addElected success',
			succ_msg: data
		});
		res.end();
	},
	/**
	 * 被选举人添加成功
	 * res: 客户端响应
	 */
	delElected : function(res,data) {
		logger.info('delElected success');
		res.send({
			rsp_code: 'succ',
			succ_code: 'delElected success',
			succ_msg: data
		});
		res.end();
	},

	/**
	 * 更新投票记录成功
	 * res: 客户端响应
	 */
	updateVote : function(res,data) {
		logger.info('updateVote success');
		res.send({
			rsp_code: 'succ',
			succ_code: 'updateVote success',
			succ_msg: data
		});
		res.end();
	},
    /**
	 * 查询投票数成功
	 * res: 客户端响应
	 */
	findVote : function(res,data) {
		logger.info('findVote success');
		res.send({
			rsp_code: 'succ',
			succ_code: 'findVote success',
			succ_msg: data
		});
		res.end();
	},


}
