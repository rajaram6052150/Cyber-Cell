<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT *
FROM bank_details
ORDER by bank_name ASC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->id = $result['id'];
        $resp_status->bank_name = $result['bank_name'];
        $resp_status->bank_officer_name = $result['bank_officer_name'];
        $resp_status->designation = $result['designation'];
        $resp_status->bank_branch_name = $result['bank_branch_name'];
        $resp_status->bank_ifsc = $result['bank_ifsc'];
        $resp_status->bank_subject = $result['bank_subject'];
        $resp_status->bank_email = $result['bank_email'];
        $resp_status->bank_city = $result['bank_city']; 

        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
