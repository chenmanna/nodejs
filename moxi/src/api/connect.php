<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'moxi';
    // 1.创建与数据库的连接
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2. 检测连接失败
    if ($conn->connect_error) {  
        die($conn->connect_error);
    }  
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
?>