### 说明事项
1. 首先本地安装Mongodb redis
2. npm install
3. 路由分为 plat(平台管理) 和 base(用户)
  - 进入平台管理 url:"http://localhost:3001/openapi/plat" 这个地方的账号密码自己在数据库添加
  -平台登录成功进入控制投票开始结束 增删改查页面 url:"http://localhost:3001/openapi/plat/curd?token=hhhh"
  - 进入base url:"http://localhost:3001/openapi/main"  这个地方使用邮箱注册 （在注册邮箱的接口要对邮箱进行授权开发中使用的是我自己的qq邮箱）
  - base 注册成功进入投票页面 url:"http://localhost:3001/openapi/vote?token=uuuu"
4.数据库名字 vote
5.平台管理 两个集合platusers(平台的管理者) electeds(被选举的对象)
6.base用户  两个集合 users(用户信息) votes(控制投票) 以上集合的schema 在项目model文件
```
//electeds 
{
    user:{
        type:String,
        required:true,
    },
    vote:[String]
}
//platusers
{
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
}
// users
email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    voteings:{
        type:[],
        required:true,
    }
//votes
 vote:{
        type:Boolean,
        required:true
    },
    username:{
        type:String,
        required:true,
    }
//以上schema由于时间关系定义都比较
```
### 后台接口文档看代码的注释暂时没有提供接口文档



 
