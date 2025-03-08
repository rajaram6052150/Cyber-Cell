<?php
//header("Access-Control-Allow-Origin:*");
//header("Access-Control-Allow-Credentials:true");
//header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
//header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//
//include 'config.php';
//$array = json_decode($_POST['values']);
//$id = $array[26];
//echo $id;
//if ($id == NULL) {
//    // $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
//    $dbcon->query("INSERT INTO excel_data (
//     ack_no,
//     state_name,
//     district_name,
//     station_name,
//     crime_info,
//    category,
//    sub_category,
//    c_status,
//    incident_date,
//    complaint_date,
//    last_action_date,
//    complainant_name,
//    complainant_mobile,
//    complainant_email,
//    complainant_address,
//    suspect_name,
//    suspect_mobile,
//    suspect_id_no,
//    amount,
//    transaction_type,
//    ac_bank_name,
//    ac_no,
//    ifsc_code,
//    transaction_id,
//    transaction_date,
//    transaction_amount ,
//
//
//) VALUES (
//       '$array[0]',
//       '$array[1]',
//       '$array[2]',
//       '$array[3]',
//       '$array[4]',
//       '$array[5]',
//       '$array[6]',
//       '$array[7]',
//       '$array[8]',
//       '$array[9]',
//       '$array[10]',
//       '$array[11]',
//       '$array[12]',
//       '$array[13]',
//       '$array[14]',
//       '$array[15]',
//       '$array[16]',
//       '$array[17]',
//       '$array[18]');");
//    mysqli_close($dbcon);
//} else {
//    $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
//    if ($check->num_rows > 0) {
//        $payment_id = $array[31];
//        $subject_id = $array[32];
//        $result = mysqli_fetch_assoc($check);
//        $officers = $array[27];
//        $pay_type = $array[28];
////        $subject_desc = $array[29];
//        // echo "UPDATE excel_data SET officers='$officers',pay_type='$pay_type',subject_desc='$subject_desc',request_pending='Y' where id='$id'";
//        // print_r($array);
//        // exit;
//        $dbcon->query("UPDATE excel_data SET officers='$officers',pay_type='$pay_type',request_pending='Y' where id='$id';");
//        mysqli_close($dbcon);
//    }
//}
//header('Content-Type: application/json');
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true");
//header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
//header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//
//include 'config.php';
//
//$array = json_decode($_POST['values'], true);
//$id = $array[26];
//
//if ($id == NULL) {
//  $query = "INSERT INTO excel_data (
//        ack_no,
//        state_name,
//        district_name,
//        station_name,
//        crime_info,
//        category,
//        sub_category,
//        c_status,
//        incident_date,
//        complaint_date,
//        last_action_date,
//        complainant_name,
//        complainant_mobile,
//        complainant_email,
//        complainant_address,
//        suspect_name,
//        suspect_mobile,
//        suspect_id_no,
//        amount
//    ) VALUES (
//        '{$array[0]}',
//        '{$array[1]}',
//        '{$array[2]}',
//        '{$array[3]}',
//        '{$array[4]}',
//        '{$array[5]}',
//        '{$array[6]}',
//        '{$array[7]}',
//        '{$array[8]}',
//        '{$array[9]}',
//        '{$array[10]}',
//        '{$array[11]}',
//        '{$array[12]}',
//        '{$array[13]}',
//        '{$array[14]}',
//        '{$array[15]}',
//        '{$array[16]}',
//        '{$array[17]}',
//        '{$array[18]}'
//    );";
//
//  if ($dbcon->query($query) === TRUE) {
//    echo json_encode(["success" => "Data inserted successfully"]);
//  } else {
//    echo json_encode(["error" => "Error inserting data: " . $dbcon->error]);
//  }
//} else {
//  $check = $dbcon->query("SELECT * FROM excel_data where id='$id';");
//  if ($check->num_rows > 0) {
//    $payment_id = $array[31];
//    $subject_id = $array[32];
//    $result = mysqli_fetch_assoc($check);
//    $officers = $array[27];
//    $pay_type = $array[28];
//
//    $dbcon->query("UPDATE excel_data SET officers='$officers', pay_type='$pay_type', request_pending='Y' where id='$id';");
//    echo json_encode(["success" => "Data updated successfully"]);
//  } else {
//    echo json_encode(["error" => "No record found for ID: $id"]);
//  }
//}
//
//mysqli_close($dbcon);


// Include configuration file with database credentials
include('config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// Initialize variables and response status
$resp_status = new stdClass;
$upload_file = basename($_FILES['transactionupload']['name']);
$filename = basename($_FILES['transactionupload']['name']);

// Create a database connection using PDO for improved security and error handling
try {
  $dbcon = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
  $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  $resp_status->error = 'Database connection error: ' . $e->getMessage();
  echo json_encode($resp_status);
  exit;
}

// Handle file upload errors
if ($_FILES['transactionupload']['error'] !== UPLOAD_ERR_OK) {
  $resp_status->error = 'File upload error: ' . $_FILES['transactionupload']['error'];
  echo json_encode($resp_status);
  exit;
}

// Ensure only CSV files are allowed
if ($_FILES['transactionupload']['type'] !== 'text/csv') {
  $resp_status->error = 'Only CSV files are allowed.';
  echo json_encode($resp_status);
  exit;
}

// Define upload directory and prepare the path
$upload_dir = "./trans_uploads/";
$upload_path = $upload_dir . $upload_file;

// Move the uploaded file securely using move_uploaded_file with error handling
if (!move_uploaded_file($_FILES['transactionupload']['tmp_name'], $upload_path)) {
  $resp_status->error = 'Upload failed. Please check permissions and directory structure.';
  echo json_encode($resp_status);
  exit;
}

// Open the CSV file for reading
if (($csvFile = fopen($upload_path, 'r')) === false) {
  $resp_status->error = "Error opening CSV file.";
  echo json_encode($resp_status);
  mysqli_close($dbcon); // Important: Close the database connection even on error
  exit;
}

// Get column headers from the first line
$header = fgetcsv($csvFile, 10000, ",");

// Prepare a prepared statement with parameterized queries for improved security
$insert_stmt = $dbcon->prepare(
  "INSERT INTO ac_transaction (ack_no, transaction_type, ac_bank_name, ac_no, ifsc_code, transaction_id, transaction_date, transaction_amount)
     VALUES (:ack_no, :transaction_type, :ac_bank_name, :ac_no, :ifsc_code, :transaction_id, :transaction_date, :transaction_amount)"
);

// Insert data row by row, handling missing values, data validation, and duplicate checks
$rowCount = 0;
while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
  $rowCount++;

  // Check for missing or empty values (adapt based on your requirements)
  foreach ($csv_array as $i => $value) {
    if (empty($value) && in_array($i, [0, 1, 4, 5, 6])) { // Consider required columns
      $resp_status->error = "Row $rowCount: Missing values in required columns.";
      echo json_encode($resp_status);
      continue 2; // Skip to the next row without closing the file
    }
  }

  // Perform data validation based on data types and expected formats (use appropriate types)
  if (!is_numeric($csv_array[3]) || !is_numeric($csv_array[7])) {
    $resp_status->error = "Row $rowCount: Invalid data types for account number and amount.";
    echo json_encode($resp_status);
    continue;
  }
}
