<?php
//header("Access-Control-Allow-Origin:*");
//header("Access-Control-Allow-Credentials:true");
//header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
//header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//
//include 'config.php';
//$id = $_POST['id'];
//$resp_status = new stdClass;
//if ($id == 'undefined') {
//    $resp_status->status = 'Table-ID not received';
//} else {
//    $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
//    if ($check->num_rows > 0) {
//        $result = mysqli_fetch_assoc($check);
//        $resp_status = new stdClass;
//        $resp_status->id = $result['id'];
//        $resp_status->ack_no = $result['ack_no'];
//        $resp_status->state_name = $result['state_name'];
//        $resp_status->district_name = $result['district_name'];
//        $resp_status->police_station = $result['police_station'];
//        $resp_status->crime_info = $result['crime_info'];
//        $resp_status->category = $result['category'];
//        $resp_status->sub_category = $result['sub_category'];
//        $resp_status->c_status = $result['c_status'];
//        $resp_status->incident_date =$result['incident_date'];
//        $resp_status->complaint_date =$result['complaint_date'];
//        $resp_status->last_action_taken =$result['last_action_taken'];
//        $resp_status->complainant_name = $result['complainant_name'];
//        $resp_status->complainant_mobile = $result['complainant_mobile'];
//        $resp_status->complainant_email = $result['complainant_email'];
//        $resp_status->complainant_address = $result['complainant_address'];
//        $resp_status->suspect_name = $result['suspect_name'];
//        $resp_status->suspect_mobile = $result['suspect_mobile'];
//        $resp_status->suspect_id = $result['suspect_id'];
//        $resp_status->amount = $result['amount'];
//        $resp_status->transaction_type = $result['transaction_type'];
//        $resp_status->ac_bank_name = $result['ac_bank_name'];
//        $resp_status->ac_no = $result['ac_no'];
//        $resp_status->ifsc_code = $result['ifsc_code'];
//        $resp_status->transaction_id = $result['transaction_id'];
//        $resp_status->transaction_date = $result['transaction_date'];
//        $resp_status->transaction_amount = $result['transaction_amount'];
//        $resp_status->officers = $result['officers'];
//        $resp_status->pay_type = $result['pay_type'];
//        $resp_status->subject_desc = $result['subject_desc'];
//        $resp_status->request_pending = $result['request_pending'];
//        $resp_status->approved = $result['approved'];
//        $resp_status->sign = $result['sign'];
//        $resp_status->status = 'ok';
//    //    $response[] = $resp_status;
//    } else {
//        $resp_status->status = 'id error';
//    }
//    mysqli_close($dbcon);
//}
//echo json_encode($resp_status);
//

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$id = $_POST['id'];
$resp_status = new stdClass;

if ($id == 'undefined') {
  $resp_status->status = 'Table-ID not received';
} else {
  $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
  if ($check->num_rows > 0) {
    $result = mysqli_fetch_assoc($check);
    $resp_status = new stdClass;
    $resp_status->id = $result['id'];
    $resp_status->ack_no = $result['ack_no'];
    $resp_status->state_name = $result['state_name'];
    $resp_status->district_name = $result['district_name'];
    $resp_status->police_station = $result['police_station'];
    $resp_status->crime_info = $result['crime_info'];
    $resp_status->category = $result['category'];
    $resp_status->sub_category = $result['sub_category'];
    $resp_status->c_status = $result['c_status'];
    $resp_status->incident_date = $result['incident_date'];
    $resp_status->complaint_date = $result['complaint_date'];
    $resp_status->last_action_taken = $result['last_action_taken'];
    $resp_status->complainant_name = $result['complainant_name'];
    $resp_status->complainant_mobile = $result['complainant_mobile'];
    $resp_status->complainant_email = $result['complainant_email'];
    $resp_status->complainant_address = $result['complainant_address'];
    $resp_status->suspect_name = $result['suspect_name'];
    $resp_status->suspect_mobile = $result['suspect_mobile'];
    $resp_status->suspect_id = $result['suspect_id'];
    $resp_status->amount = $result['amount'];
    $resp_status->transaction_type = $result['transaction_type'];
    $resp_status->ac_bank_name = $result['ac_bank_name'];
    $resp_status->ac_no = $result['ac_no'];
    $resp_status->ifsc_code = isset($result['ifsc_code']) ? $result['ifsc_code'] : null;
    $resp_status->transaction_id = $result['transaction_id'];
    $resp_status->transaction_date = isset($result['transaction_date']) ? $result['transaction_date'] : null;
    $resp_status->transaction_amount = $result['transaction_amount'];
    $resp_status->officers = $result['officers'];
    $resp_status->pay_type = isset($result['pay_type']) ? $result['pay_type'] : null;
    $resp_status->subject_desc = isset($result['subject_desc']) ? $result['subject_desc'] : null;
    $resp_status->request_pending = $result['request_pending'];
    $resp_status->approved = $result['approved'];
    $resp_status->sign = $result['sign'];
    $resp_status->status = 'ok';
  } else {
    $resp_status->status = 'id error';
  }
  mysqli_close($dbcon);
}
echo json_encode($resp_status);

