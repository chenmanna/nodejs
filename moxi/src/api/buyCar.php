<?php
    include 'connect.php';
    $currentId = isset($_GET["currentId"])?$_GET["currentId"] : "hhh";
    $currentTitle = isset($_GET["currentTitle"])?$_GET["currentTitle"] : "内容";
    $currentImg = isset($_GET["currentImg"])?$_GET["currentImg"] : "图片";
    $currentPrice = isset($_GET["currentPrice"])?$_GET["currentPrice"] : "价格";
    $currentGoods = isset($_GET["currentGoods"])?$_GET["currentGoods"] : "名称";
    $sql = "select * from  buycar where uid='$currentId'";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        // 数据库有当前加购信息则qty++
        $qty = "update buycar set qty=qty+1 where uid='$currentId'";
        $result = $conn->query($qty);
        // 判断是否加入成功
        if($result){
                $sql = 'select * from buycar';
                //获取查询结果集
                $result = $conn->query($sql);
                //使用查询结果集
                $row = $result->fetch_all(MYSQLI_ASSOC);
                //释放查询结果集，避免资源浪费
                $result->close();
                echo json_encode($row,JSON_UNESCAPED_UNICODE);
            }else{
                echo "数据加载错误";
            }

    }else{
        // 查询不到则添加当前加购信息到数据库
        $sql = "insert into buycar(goodsname,title,price,url,qty,uid) values('$currentGoods','$currentTitle','$currentPrice','$currentImg','1','$currentId')";
            // $sql = "insert into buycar(goodsname) values('$currentGoods')";
            $result = $conn->query($sql);
            // 判断是否写入成功 
            if($result){
                $sql = 'select * from buycar';
                //获取查询结果集
                $result = $conn->query($sql);
                //使用查询结果集
                $row = $result->fetch_all(MYSQLI_ASSOC);
                //释放查询结果集，避免资源浪费
                $result->close();
                echo json_encode($row,JSON_UNESCAPED_UNICODE);
            }else{
                echo "数据加载错误";
            }
    }


    // update 表名称 set 字段名称 = 字段名称 + 1 [ where语句]
?>