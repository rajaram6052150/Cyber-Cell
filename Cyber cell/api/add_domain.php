<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);
$id = $array[5];
if ($id == NULL) {
    $dbcon->query("INSERT INTO domain_details (
    domain_name,
    site_info,
    domain_designation,
    domain_email,
    domain_city   
) VALUES (
    '$array[0]',
    '$array[1]',
    '$array[2]',
    '$array[3]',
    '$array[4]'
);");   
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM domain_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE domain_details SET domain_name='$array[0]',site_info='$array[1]',domain_designation='$array[2]',
        domain_email='$array[3]',domain_city='$array[4]' where id='$id';");
        mysqli_close($dbcon);
    }
}
