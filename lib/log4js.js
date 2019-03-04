let log4js = require("log4js");
let path=require('path');
let defpath=path.join(__dirname,'../logs/');

log4js.configure({
	appenders: { 
		console:{type:'console'},
		cheese: { type: 'dateFile',alwaysIncludePattern: true,filename:"./logs/data",pattern: "yyyyMMdd.log", maxLogSize: 11024},
		
	 },
	categories: { 
		default: { appenders: ['console','cheese'], level: 'all',replaceConsole: true },
	}
});

exports.getLogger = function(file){
	return log4js.getLogger(file);
};