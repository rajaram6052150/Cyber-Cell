<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$ack_no = $_POST['ack_no'];
$resp_status = new stdClass;
if ($id == 'undefined') {
    $resp_status->status = 'Table-ID not received';
} else {
    $check = $dbcon->query("SELECT ed.complaint_date, s.* FROM excel_data ed JOIN staffs s ON s.id = ed.officers where ack_no='$ack_no'");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $resp_status = new stdClass;
        $resp_status->complaint_date =$result['complaint_date'];
        $resp_status->sname =$result['sname'];
        $resp_status->designation =$result['designation'];
        $resp_status->srole =$result['srole'];
        $resp_status->contact =$result['contact'];
        $resp_status->sign = $result['sign'];
        $resp_status->status = 'ok';
    //    $response[] = $resp_status;
    } else {
        $resp_status->status = 'error';
    }
    mysqli_close($dbcon);
}
echo json_encode($resp_status);