<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);
$id = $array[5];
if ($id == NULL) {
    $dbcon->query("INSERT INTO merchant_details (
    merchant_name,
    merchant_designation,
    merchant_subject,
    merchant_email,
    merchant_city   
) VALUES (
    '$array[0]',
    '$array[1]',
    '$array[2]',
    '$array[3]',
    '$array[4]'
);");   
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM merchant_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE merchant_details SET merchant_name='$array[0]',merchant_subject='$array[1]',designation='$array[2]',
        merchant_email='$array[3]',merchant_city='$array[4]' where id='$id';");
        mysqli_close($dbcon);
    }
}
