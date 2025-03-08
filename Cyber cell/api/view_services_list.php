<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT *
FROM services_list
ORDER by bank ASC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_object($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->bank = $result['bank'];
        $resp_status->social_media = $result['social_media'];
        $resp_status->merchant = $result['merchant'];
        $resp_status->domain = $result['domain'];
        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
