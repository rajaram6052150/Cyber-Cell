<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT * FROM office_details ORDER by oname ASC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->name = $result['oname'].", ".$result['onumber'];
        $resp_status->place = $result['onumber'];
        $resp_status->hplace = $result['onumber'];
        $resp_status->hname = $result['oname'];

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
