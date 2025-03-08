<?php
//include('config.php');
//
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
//header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
//header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//
//$resp_status = new stdClass;
//$upload_file = basename($_FILES['transactionupload']['name']);
//$filename = basename($_FILES['transactionupload']['name']);
//
//if ($_FILES['transactionupload']['type'] !== 'text/csv') {
//    $resp_status->error = 'Only CSV files are allowed.';
//    echo json_encode($resp_status);
//    exit;
//}
//
//if (move_uploaded_file($_FILES['transactionupload']['tmp_name'], $upload_file)) {
//    echo '{"success":"File is valid, and was successfully uploaded"}';
//} else {
//    $resp_status->error = 'Upload failed';
//    echo json_encode($resp_status);
//    exit;
//}
//
//$csvFile = fopen($filename, 'r');
//
//if ($csvFile) {
//    $header = fgetcsv($csvFile, 10000, ",");
//
//    while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
//        $insert_csv = array();
//        $insert_csv['ack_no'] = $csv_array[1];
//        $insert_csv['transaction_type'] = $csv_array[2];
//        $insert_csv['ac_bank_name'] = $csv_array[3];
//        $insert_csv['ac_no'] = $csv_array[4];
//        $insert_csv['ifsc_code'] = $csv_array[5];
//        $insert_csv['transaction_id'] = $csv_array[6];
//        $insert_csv['transaction_date'] = $csv_array[7];
//        $insert_csv['transaction_amount'] = $csv_array[8];
//
//        $check = $dbcon->query("SELECT * FROM ac_transaction WHERE ack_no='" . $insert_csv['ack_no'] . "';");
//
//        // if ($check->num_rows > 0) {
//        //     $resp_status->message = 'Acknowledgment already exists...';
//        //     echo json_encode($resp_status);
//        // } else {
//        if ($insert_csv['ack_no'] != '' && $insert_csv['transaction_amount'] != '') {
//            $result = $dbcon->query("INSERT INTO ac_transaction (ack_no, transaction_type, ac_bank_name, ac_no, ifsc_code, transaction_id, transaction_date,
//            transaction_amount)
//            VALUES
//            (
//                    '" . $insert_csv['ack_no'] . "',
//                    '" . $insert_csv['transaction_type'] . "',
//                    '" . $insert_csv['ac_bank_name'] . "',
//                    '" . $insert_csv['ac_no'] . "',
//                    '" . $insert_csv['ifsc_code'] . "',
//                    '" . $insert_csv['transaction_id'] . "',
//                    '" . $insert_csv['transaction_date'] . "',
//                    '" . $insert_csv['transaction_amount'] . "'
//                );");
//
//            $resp_status->result = $result;
//            echo json_encode($resp_status);
//        } else {
//            $resp_status->message = 'Acknowledgment number or transaction amount not found';
//            echo json_encode($resp_status);
//        }
//        // }
//    }
//    fclose($csvFile);
//} else {
//    $resp_status->error = "Error opening CSV file.";
//    echo json_encode($resp_status);
//}
//
//mysqli_close($dbcon);


include('config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

$resp_status = new stdClass;
$upload_file = basename($_FILES['transactionupload']['name']);
$filename = basename($_FILES['transactionupload']['name']);

function convertScientificToRegular($scientificNumber) {
  $parts = explode('E', $scientificNumber);
  if (count($parts) == 2) {
    return bcmul($parts[0], bcpow('10', $parts[1]));
  }
  return $scientificNumber; // Return as is if not in scientific notation
}


if ($_FILES['transactionupload']['error'] !== UPLOAD_ERR_OK) {
    $resp_status->error = 'File upload error: ' . $_FILES['transactionupload']['error'];
    echo json_encode($resp_status);
    exit;
}

if ($_FILES['transactionupload']['type'] !== 'text/csv') {
    $resp_status->error = 'Only CSV files are allowed.';
    echo json_encode($resp_status);
    exit;
}

$upload_dir = "./trans_uploads/";
$upload_path = $upload_dir . $upload_file;

if (move_uploaded_file($_FILES['transactionupload']['tmp_name'], $upload_path)) {
    $resp_status->success = 'File uploaded successfully.';
} else {
    $resp_status->error = 'Upload failed.';
    echo json_encode($resp_status);
    exit;
}

$csvFile = fopen($upload_path, 'r');

if ($csvFile) {
    $header = fgetcsv($csvFile, 10000, ",");

    while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
        // Perform data validation and sanitation here if needed

        $insert_csv = array();
        $insert_csv['id']=$csv_array[0];
        $insert_csv['ack_no'] = convertScientificToRegular($csv_array[1]);
        $insert_csv['transaction_type'] = $csv_array[2];
        $insert_csv['ac_bank_name'] = $csv_array[3];
        $insert_csv['ac_no'] = $csv_array[4];
        $insert_csv['ifsc_code'] = $csv_array[5];
        $insert_csv['transaction_id'] = $csv_array[6];
        $insert_csv['transaction_date'] = $csv_array[7];
        $insert_csv['transaction_amount'] = $csv_array[8];

        // Perform additional validation on each row before insertion

        $result = $dbcon->query("INSERT INTO ac_transaction (ack_no, transaction_type, ac_bank_name, ac_no, ifsc_code, transaction_id, transaction_date, transaction_amount)
            VALUES
            (
                '" . mysqli_real_escape_string($dbcon, convertScientificToRegular($insert_csv['ack_no'])) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['transaction_type']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['ac_bank_name']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['ac_no']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['ifsc_code']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['transaction_id']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['transaction_date']) . "',
                '" . mysqli_real_escape_string($dbcon, $insert_csv['transaction_amount']) . "'
            );");

        if ($result) {
            $resp_status->success = 'Data inserted successfully.';
            echo json_encode($resp_status);
        } else {
            $resp_status->error = 'Error inserting data: ' . mysqli_error($dbcon);
            echo json_encode($resp_status);
        }
    }

    fclose($csvFile);
} else {
    $resp_status->error = "Error opening CSV file.";
    echo json_encode($resp_status);
}

mysqli_close($dbcon);
