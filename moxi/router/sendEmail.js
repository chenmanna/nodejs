const nodemailer = require('nodemailer');
// 插件nodemailer发送邮箱
let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user:'450627420@qq.com', // 发送方的邮箱（更改）
        pass: 'wullwfmvjyhdbgij' // smtp 的授权码（更改）
    }
});
// 封装发送邮箱数据    call回调用于判断验证码是否发送完成后续执行代码（发送成功或失败）
function sendMail(mail,code,call){
	// 发送的配置项
    let mailOptions = {
        from: '"Fred Foo 👻" <450627420@qq.com>', // 发送方（更改）
        to: mail, // 接收方
        subject: 'h5', // 标题
        text: 'Hello world?', // 文本内容
        html: `<h3>验证码:${code}？nodejs登陆注册验证</h3>`//页面内容
    };
   //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        // 错误优先
	    if (error) {
	       call(-1)
	    }
	     call(0)//因为是异步 所有需要回调函数通知成功结果

    });
}
// 抛出
module.exports={sendMail}