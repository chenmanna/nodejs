<?php
    include 'connect.php';
    $username = isset($_GET["username"])?$_GET["username"] : null;
    $password = isset($_GET["password"])?$_GET["password"] : null;

    // 查找数据库同名用户名
    $sql = "select * from login where username='$username'";
      // 执行语句
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo "no";
    }else{
        if($username && $password){
            $sql = "insert into login(username,password) values('$username','$password')";
            // var_dump($sql);
            $result = $conn->query($sql);
            // 判断是否写入成功 
            if($result){
                echo "success";
            }else{
                echo "fail";
            }
            // echo "yes";
        }else{
            echo "用户名或密码有误";
        }
        
    }

?> 