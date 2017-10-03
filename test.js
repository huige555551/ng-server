var User = require("./user.js");

/**
 * 插入
 */
function insert() {
 
    var user = new User({
        order : 1,                 //用户账号
        name: 'test',                            //密码
        showIndex : false                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();