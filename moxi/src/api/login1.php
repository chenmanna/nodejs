<?php
  include 'connect.php';
  $username = isset($_GET["username"])?$_GET["username"]:null;
  $password = isset($_GET["password"])?$_GET["password"]:null;
  // 加密查询？？
  // $parssword = md5($password);
  // 查找数据库是否存在用户信息
  $sql = "select * from login where username='$username' and password='$password'";
  // 执行语句
  $result = $conn->query($sql);
  if($result->num_rows>0){
    echo "success";
  }else{ 
    echo "fail";
  }
?>