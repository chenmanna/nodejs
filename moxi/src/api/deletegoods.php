<?php
    include 'connect.php';
    $currentId = isset($_GET["currentId"])?$_GET["currentId"] : "hhh";
    // echo $currentId;
  //编写sql语句
    $sql = "delete from buycar where uid='$currentId'";
    $res = $conn->query($sql); 
    // $res = mysql_query($sql);
    if($res){
        $sql = "select * from buycar";
        //获取查询结果集
        $result = $conn->query($sql);
        //使用查询结果集
        $row = $result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集，避免资源浪费
        $result->close();
        //把结果输出到前台
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        // 关闭数据库，避免资源浪费
        $conn->close();
    }else{
        echo "数据删除失败";
    }



?>