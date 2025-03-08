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
    $check = $dbcon->query("SELECT * FROM bank_details where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status->status = 'ok';
        $resp_status->id = $result['id'];
        $resp_status->bank_name = $result['bank_name'];
        $resp_status->bank_officer_name = $result['bank_officer_name'];
        $resp_status->designation = $result['designation'];
        $resp_status->bank_branch_name = $result['bank_branch_name'];
        $resp_status->bank_ifsc = $result['bank_ifsc'];
        $resp_status->bank_subject = $result['bank_subject'];
        $resp_status->bank_email = $result['bank_email'];
        $resp_status->bank_city = $result['bank_city'];

    }
    else{
        $resp->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($resp_status);