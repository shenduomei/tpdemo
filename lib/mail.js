// let nodemail = require('nodemailer');

// async function mail(email){

//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let account = await nodemail.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemail.createTransport({
//       service:'qq',
//       auth: {
//         user: '857683182@qq.com',
//         pass: 'gvayrwkfgcnkbbjj' //授权码,通过QQ获取
//       }
//     });
  
//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '857683182@qq.com', // 发送者
//         to: email, // 接受者,可以同时发送多个,以逗号隔开
//         subject: '邮箱注册账号确认', // 标题
//         html: `该邮箱已注册了平台的投票系统`
//     };
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail(mailOptions)
  
//     console.log("Message sent: %s", info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemail.getTestMessageUrl(info));
  
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }
  
//   mail().catch(console.error);
//   module.exports = mail()