<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
$check = $dbcon->query("SELECT ed.ack_no, ac.ac_bank_name, ed.district_name, ed.category, ac.ac_bank_name, ed.c_status, ed.incident_date, ed.complaint_date, ed.complainant_name, ed.complainant_mobile, SUM(ac.transaction_amount) AS amount FROM excel_data ed JOIN ac_transaction ac ON ac.ack_no = ed.ack_no WHERE ed.approved='Y' GROUP BY ac.ac_bank_name ORDER by ed.ack_no DESC;");
if ($check->num_rows > 0) {
    for ($i = 0; $i < $check->num_rows; $i++) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->ack_no = $result['ack_no'];
        $resp_status->ac_bank_name = $result['ac_bank_name'];
        // $resp_status->state_name = $result['state_name'];
        $resp_status->district_name = $result['district_name'];
        // $resp_status->police_station = $result['police_station'];
        // $resp_status->crime_info = $result['crime_info'];
        $resp_status->category = $result['category'];
        // $resp_status->sub_category = $result['sub_category'];
        $resp_status->c_status = $result['c_status'];
        // $resp_status->incident_date = date('Y-m-d', strtotime($result['incident_date']));
        // $resp_status->complaint_date = date('Y-m-d', strtotime($result['complaint_date']));
        // $resp_status->last_action_taken = date('Y-m-d', strtotime($result['complaint_date']));
        $resp_status->incident_date =$result['incident_date'];
        $resp_status->complaint_date =$result['complaint_date'];
        // $resp_status->last_action_taken =$result['last_action_taken'];        
        $resp_status->complainant_name = $result['complainant_name'];
        $resp_status->complainant_mobile = $result['complainant_mobile'];
        // $resp_status->complainant_email = $result['complainant_email'];
        // $resp_status->complainant_address = $result['complainant_address'];
        // $resp_status->suspect_name = $result['suspect_name'];
        // $resp_status->suspect_mobile = $result['suspect_mobile'];
        // $resp_status->suspect_id = $result['suspect_id'];
        $resp_status->amount = $result['amount'];
        $response[] = $resp_status;
    }
}
echo json_encode($response);
mysqli_close($dbcon);
