<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
if (!empty($_POST['ack_no']) && !empty($_POST['ac_bank_name'])) {
    $ack_no = $_POST['ack_no'];
    $ac_bank_name = $_POST['ac_bank_name'];
    $check = $dbcon->query("SELECT * FROM `ac_transaction` WHERE ack_no = '$ack_no' AND ac_bank_name = '$ac_bank_name'");
    if ($check->num_rows > 0) {
        for ($i = 0; $i < $check->num_rows; $i++) {
            $result = mysqli_fetch_assoc($check);
            $resp_status = new stdClass;
            $resp_status->ac_no = $result['ac_no'];
            $resp_status->ifsc_code = $result['ifsc_code'];
            $resp_status->transaction_date = $result['transaction_date'];
            $resp_status->transaction_amount = $result['transaction_amount'];
            $resp_status->transaction_id = $result['transaction_id'];
            $response[] = $resp_status;
        }
    }
    echo json_encode($response);
    mysqli_close($dbcon);
} else {
    echo json_encode($response);
}
