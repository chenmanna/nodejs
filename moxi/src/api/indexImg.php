<?php
    include 'connect.php';
      //编写sql语句
    $sql = 'select * from moxicgoods';
    //获取查询结果集
    $result = $conn->query($sql);
    //使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    //释放查询结果集，避免资源浪费
    $result->close();
    //把结果输出到前台
    echo json_encode($row);
    // 关闭数据库，避免资源浪费
    $conn->close();
    // include 'connect.php';
    //   //编写sql语句 
    // $sql = 'select * from menuParent where id = 1';
    // //获取查询结果集
    // $result = $conn->query($sql);
    // //使用查询结果集
    // $row = $result->fetch_all(MYSQLI_ASSOC);

    // $arr2 = array();
    // //$result1 = mysql_query("SELECT * FROM Persons");
    // while($row1=mysql_fetch_array($row)){
    //     $arr2[]=$row1['user_name']; 
    // }
    // //释放查询结果集，避免资源浪费
    // $result->close();
    // //把结果输出到前台
    // echo $arr2;
    // // echo json_encode($row);
    // // 关闭数据库，避免资源浪费
    // $conn->close();

?>