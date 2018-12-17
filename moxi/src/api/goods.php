<?php
    include 'connect.php';
    $currentCon = isset($_GET["goodsname"])?$_GET["goodsname"]: "hhh";
    $sql = "select * from goodslist where goodsname='$currentCon'";
    $result = $conn->query($sql);
      $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?> 
