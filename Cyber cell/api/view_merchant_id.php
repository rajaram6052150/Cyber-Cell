<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;
if ($id == 'undefined') {
    $resp->status = 'error1';
} else {
    $check = $dbcon->query("SELECT * FROM merchant_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->id = $result['id'];
        $resp_status->merchant_name = $result['merchant_name'];
        $resp_status->merchant_designation = $result['merchant_designation'];
        $resp_status->merchant_subject = $result['merchant_subject'];
        $resp_status->merchant_email = $result['merchant_email'];
        $resp_status->merchant_city = $result['merchant_city'];

    }
    else{
        $resp->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($resp_status);