<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT *
FROM excel_data
ORDER by id desc;");
for ($i = 0; $i < $check->num_rows; $i++) {
    $result = mysqli_fetch_assoc($check);
    $resp_status = new stdClass;
    $resp_status->id = $result['id'];
    $resp_status->ack_no = $result['ack_no'];
    $resp_status->crime_info = $result['crime_info'];
    $response[] = $resp_status;
}
echo json_encode($response);
mysqli_close($dbcon);
