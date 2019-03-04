/**
 * Created by little su
 * 系统配置
 */
module.exports = {
    // 环境（开发：development， 生产：production）
    evn: 'development',
    /**
     * devredis
     */
    redis:{
      port:6379,
      host:'127.0.0.1',
      password:'*****',
      db:{db:0}
    },
    /**
     * tokneredis 
     */
    tokenRedis:{
      maxAge:3600 * 1000,//单位是毫秒
    },
    /**
     * jsonwebtoke 
     */
    jwt: {
        secret: 'jwtsecret_dev', // 指定生成token密钥
        options: {
          algorithm: 'HS256', // default HS256
          expiresIn: 60 * 60, // 过期时间时间戳格式 单位秒  Eg: 60, "2 days"
          audience: 'sssss', // 接收该JWT的一方
          issuer: 'ssss', // jwt签发者
          subject: 'sssss', // 该JWT所面向的用户
        },
      },
    // 服务端口
    port: 3001,
    domainName:"http://127.0.0.1:3001",

    /**
     * 日志输出级别
     * @可选值：TRACE / DEBUG / INFO / WARN / ERROR / FATAL / MARK / OFF
     * @建议：开发环境建议为'INFO'，生产环境建议为'ERROR'
     */
    logLevel: 'INFO',

    // 日志输入路径
    logPath: '/logs/',
}