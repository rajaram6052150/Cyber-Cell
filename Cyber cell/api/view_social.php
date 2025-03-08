<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT *
FROM social_media
ORDER by media_name ASC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->media_name = $result['media_name'];
        $resp_status->media_designation = $result['media_designation'];
        $resp_status->media_subject = $result['media_subject'];
        $resp_status->media_email = $result['media_email'];
        $resp_status->media_city = $result['media_city'];

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
