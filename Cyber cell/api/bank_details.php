<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
if (!empty($_POST['bank_name'])) {
    $bank_name = $_POST['bank_name'];
    $check = $dbcon->query("SELECT * FROM `bank_details` WHERE bank_name = '$bank_name'");
    $result = mysqli_fetch_assoc($check);
    echo json_encode($result);
    mysqli_close($dbcon);
} else {
    echo json_encode($response);
}
