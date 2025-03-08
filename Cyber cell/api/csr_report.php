<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$response = [];
$resp_status = new stdClass;
if ($id == 'undefined') {
    $resp_status->status = 'Table-ID not received';
} else {
    // $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
    $check = $dbcon->query("SELECT ac.* FROM excel_data ed JOIN ac_transaction ac ON ac.ack_no = ed.ack_no WHERE ed.id='$id' GROUP BY ac.ac_bank_name");
    if ($check->num_rows > 0) {
        for ($i = 0; $i < $check->num_rows; $i++) {
            $result = mysqli_fetch_assoc($check);
            $resp_status = new stdClass;
            $resp_status->id = $result['id'];
            $resp_status->ack_no = $result['ack_no'];
            $resp_status->transaction_type = $result['transaction_type'];
            $resp_status->ac_bank_name = $result['ac_bank_name'];
            $resp_status->ac_no = $result['ac_no'];
            $resp_status->ifsc_code = $result['ifsc_code'];
            $resp_status->transaction_id = $result['transaction_id'];
            $resp_status->transaction_date = $result['transaction_date'];
            $resp_status->transaction_amount = $result['transaction_amount'];
            $resp_status->ac_subject = $result['ac_subject'];
            $resp_status->status = 'ok';
            $response[] = $resp_status;
        }
    } else {
        $resp_status->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($response);
