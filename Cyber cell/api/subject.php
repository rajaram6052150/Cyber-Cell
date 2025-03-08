<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$response = [];
if (!empty($_POST['ack_no'])) {
    $ack_no = $_POST['ack_no'];
    $check = $dbcon->query("SELECT sl.subject_desc FROM `excel_data` ed JOIN subject_list sl ON sl.id = ed.subject_desc WHERE ed.ack_no = '$ack_no'");
    if ($check->num_rows > 0) {
        for ($i = 0; $i < $check->num_rows; $i++) {
            $result = mysqli_fetch_assoc($check);
            $resp_status = new stdClass;
            $resp_status->subject_desc = $result['subject_desc'];
        }
    }
    echo json_encode($resp_status);
    mysqli_close($dbcon);
} else {
    echo json_encode($response);
}
