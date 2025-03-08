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
    $check = $dbcon->query("SELECT * FROM social_media where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->id = $result['id'];
        $resp_status->media_name = $result['media_name'];
        $resp_status->media_designation = $result['media_designation'];
        $resp_status->media_subject = $result['media_subject'];
        $resp_status->media_email = $result['media_email'];
        $resp_status->media_city = $result['media_city'];

    }
    else{
        $resp->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($resp_status);