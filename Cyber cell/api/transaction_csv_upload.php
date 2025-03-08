<?php
include('config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

define('CSV_PATH', 'C:\xampp\htdocs\mani_api');
$resp_status = new stdClass;
$upload_file = CSV_PATH . basename($_FILES['fileToUpload']['name']);
// $upload_file = basename($_FILES['fileToUpload']['name']);
$filename = basename($_FILES['fileToUpload']['name']);

if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $upload_file)) {
    echo '{"success":"File is valid, and was successfully uploaded"}';
} else {
    echo '{"failed":"Upload failed"}';
    exit;
}

$csv_file = CSV_PATH . $filename;
// $csv_file =$filename;

$csvFile = fopen($csv_file, 'r');

$header = fgetcsv($csvFile, 10000, ",");

while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
    $insert_csv = array();
    $insert_csv['ack_no'] = mysqli_real_escape_string($dbcon, $csv_array[1]);
    $insert_csv['transaction_type'] = mysqli_real_escape_string($dbcon, $csv_array[2]);
    $insert_csv['ac_bank_name'] = mysqli_real_escape_string($dbcon, $csv_array[3]);
    $insert_csv['ac_no'] = mysqli_real_escape_string($dbcon, $csv_array[4]);
    $insert_csv['ifsc_code'] = mysqli_real_escape_string($dbcon, $csv_array[5]);
    $insert_csv['transaction_id'] = mysqli_real_escape_string($dbcon, $csv_array[6]);
    $insert_csv['transaction_date'] = mysqli_real_escape_string($dbcon, $csv_array[7]);
    $insert_csv['transaction_amount'] = mysqli_real_escape_string($dbcon, $csv_array[8]);
    // $insert_csv['ack_no'] = $csv_array[1];
    // $insert_csv['transaction_type'] = $csv_array[2];
    // $insert_csv['ac_bank_name'] = $csv_array[3];
    // $insert_csv['ac_no'] = $csv_array[4];
    // $insert_csv['ifsc_code'] = $csv_array[5];
    // $insert_csv['transaction_id'] = $csv_array[6];
    // $insert_csv['transaction_date'] = $csv_array[7];
    // $insert_csv['transaction_amount'] = $csv_array[8];
    

    $check = $dbcon->query("SELECT * FROM ac_transaction WHERE transaction_type='" . $insert_csv['transaction_type'] . "';");
    if ($check->num_rows > 0) {
        $resp_status->message = 'Ackownledgement already exist...!';
        echo json_encode($resp_status);
    } else {
        if ($insert_csv['transaction_type'] == '' && $insert_csv['ac_bank_name'] == '') {
            $result = $dbcon->query("INSERT INTO ac_transaction (ack_no,transaction_type,ac_bank_name,ac_no,ifsc_code,transaction_id,
            transaction_date,transaction_amount)
                VALUES (
                    '" . $insert_csv['ack_no'] . "',
                    '" . $insert_csv['transaction_type'] . "',
                    '" . $insert_csv['ac_bank_name'] . "',
                    '" . $insert_csv['ac_no'] . "',
                    '" . $insert_csv['ifsc_code'] . "',
                    '" . $insert_csv['transaction_id'] . "',
                    '" . $insert_csv['transaction_date'] . "',
                    '" . $insert_csv['transaction_amount'] . "'
                );");

            $resp_status->result = $result;
            echo json_encode($resp_status);
        } else {
            $resp_status->message = 'Not found acknownledgement number';
            echo json_encode($resp_status);
        }
    }
}
fclose($csvFile);
mysqli_close($dbcon);
