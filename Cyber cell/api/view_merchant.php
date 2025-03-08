<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT *
FROM merchant_details
ORDER by merchant_name ASC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->merchant_name = $result['merchant_name'];
        $resp_status->merchant_designation = $result['merchant_designation'];
        $resp_status->merchant_subject = $result['merchant_subject'];
        $resp_status->merchant_email = $result['merchant_email'];
        $resp_status->merchant_city = $result['merchant_city'];

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
