<?php
include('config.php');
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
function convertScientificToRegular($scientificNumber) {
  $parts = explode('E', $scientificNumber);
  if (count($parts) == 2) {
    return bcmul($parts[0], bcpow('10', $parts[1]));
  }
  return $scientificNumber; // Return as is if not in scientific notation
}

if (!isset($_FILES["file"]) || $_FILES["file"]["error"] == UPLOAD_ERR_NO_FILE) {
    echo json_encode(["error" => "No file selected."]);
    exit();
}


$target_dir = "./csv_uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
    echo json_encode(["error" => "Sorry, file already exists."]);
    $uploadOk = 0;
}

// Check file size
if ($_FILES["file"]["size"] > 500000) {
    echo json_encode(["error" => "Sorry, your file is too large."]);
    $uploadOk = 0;
}

// Allow only CSV file format
if ($imageFileType != "csv") {
    echo json_encode(["error" => "Sorry, only CSV files are allowed."]);
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo json_encode(["error" => "Sorry, your file was not uploaded."]);
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $csvFile = fopen($target_file, 'r');

        $header = fgetcsv($csvFile, 10000, ",");

        while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
            $insert_csv = array();
            $insert_csv['ack_no'] = mysqli_real_escape_string($dbcon, convertScientificToRegular($csv_array[1]));
            $insert_csv['state_name'] = mysqli_real_escape_string($dbcon, $csv_array[2]);
            $insert_csv['district_name'] = mysqli_real_escape_string($dbcon, $csv_array[3]);
            $insert_csv['police_station'] = mysqli_real_escape_string($dbcon, $csv_array[4]);
            $insert_csv['crime_info'] = mysqli_real_escape_string($dbcon, $csv_array[5]);
            $insert_csv['category'] = mysqli_real_escape_string($dbcon, $csv_array[6]);
            $insert_csv['sub_category'] = mysqli_real_escape_string($dbcon, $csv_array[7]);
            $insert_csv['c_status'] = mysqli_real_escape_string($dbcon, $csv_array[8]);
            $insert_csv['incident_date'] = mysqli_real_escape_string($dbcon, $csv_array[9]);
            $insert_csv['complaint_date'] = mysqli_real_escape_string($dbcon, $csv_array[10]);
            $insert_csv['last_action_taken'] = mysqli_real_escape_string($dbcon, $csv_array[11]);
            $insert_csv['complainant_name'] = mysqli_real_escape_string($dbcon, $csv_array[12]);
            $insert_csv['complainant_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[13]);
            $insert_csv['complainant_email'] = mysqli_real_escape_string($dbcon, $csv_array[14]);
            $insert_csv['complainant_address'] = mysqli_real_escape_string($dbcon, $csv_array[15]);
            $insert_csv['suspect_name'] = mysqli_real_escape_string($dbcon, $csv_array[16]);
            $insert_csv['suspect_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[17]);
            $insert_csv['suspect_id'] = mysqli_real_escape_string($dbcon, $csv_array[18]);
            $insert_csv['amount'] = mysqli_real_escape_string($dbcon, $csv_array[19]);

            $check = $dbcon->query("SELECT * FROM excel_data WHERE ack_no='" . $insert_csv['ack_no'] . "';");
            if ($check->num_rows > 0) {
                echo json_encode(["error" => "Acknowledgment already exists"]);
            } else {
                if ($insert_csv['ack_no'] != '' && $insert_csv['c_status'] != '') {
                    $result = $dbcon->query("INSERT INTO excel_data (ack_no, state_name, district_name, police_station, crime_info, category, sub_category, c_status, incident_date, complaint_date, last_action_taken, complainant_name, complainant_mobile, complainant_email, complainant_address, suspect_name, suspect_mobile, suspect_id, amount) VALUES (
                          '" . $insert_csv[('ack_no')] . "',
                          '" . $insert_csv['state_name'] . "',
                          '" . $insert_csv['district_name'] . "',
                          '" . $insert_csv['police_station'] . "',
                          '" . $insert_csv['crime_info'] . "',
                          '" . $insert_csv['category'] . "',
                          '" . $insert_csv['sub_category'] . "',
                          '" . $insert_csv['c_status'] . "',
                          '" . $insert_csv['incident_date'] . "',
                          '" . $insert_csv['complaint_date'] . "',
                          '" . $insert_csv['last_action_taken'] . "',
                          '" . $insert_csv['complainant_name'] . "',
                          '" . $insert_csv['complainant_mobile'] . "',
                          '" . $insert_csv['complainant_email'] . "',
                          '" . $insert_csv['complainant_address'] . "',
                          '" . $insert_csv['suspect_name'] . "',
                          '" . $insert_csv['suspect_mobile'] . "',
                          '" . $insert_csv['suspect_id'] . "',
                          '" . $insert_csv['amount'] . "'
                      )");

                    if ($result) {
                        echo json_encode(["success" => "Data inserted successfully"]);
                    } else {
                        echo json_encode(["error" => "Error inserting data: " . mysqli_error($dbcon)]);
                    }
                } else {
                    echo json_encode(["error" => "Acknowledge number or status not found"]);
                }
            }
        }
        fclose($csvFile);
        mysqli_close($dbcon);

        echo json_encode(["message" => "The file " . basename($_FILES["file"]["name"]) . " has been uploaded."]);
    } else {
        echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
    }
}


// include('config.php');
// header('Content-Type: application/json');

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// if (!isset($_FILES["file"]) || $_FILES["file"]["error"] == UPLOAD_ERR_NO_FILE) {
//     echo "No file selected.";
//     exit();
// }

// $target_dir = "./csv_uploads/";
// $target_file = $target_dir . basename($_FILES["file"]["name"]);
// $uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// // Check if file already exists
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }

// // Check file size (you can set your own size limit)
// if ($_FILES["file"]["size"] > 500000) {
//     echo "Sorry, your file is too large.";
//     $uploadOk = 0;
// }

// // Allow only CSV file format
// if ($imageFileType != "csv") {
//     echo "Sorry, only CSV files are allowed.";
//     $uploadOk = 0;
// }

// // Check if $uploadOk is set to 0 by an error
// if ($uploadOk == 0) {
//     echo "Sorry, your file was not uploaded.";
// } else {
//     if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
//         $csvFile = fopen($target_file, 'r');

//         $header = fgetcsv($csvFile, 10000, ",");

//         while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
//             $insert_csv = array();
//             $insert_csv['ack_no'] = mysqli_real_escape_string($dbcon, $csv_array[1]);
//             $insert_csv['state_name'] = mysqli_real_escape_string($dbcon, $csv_array[2]);
//             $insert_csv['district_name'] = mysqli_real_escape_string($dbcon, $csv_array[3]);
//             $insert_csv['police_station'] = mysqli_real_escape_string($dbcon, $csv_array[4]);
//             $insert_csv['crime_info'] = mysqli_real_escape_string($dbcon, $csv_array[5]);
//             $insert_csv['category'] = mysqli_real_escape_string($dbcon, $csv_array[6]);
//             $insert_csv['sub_category'] = mysqli_real_escape_string($dbcon, $csv_array[7]);
//             $insert_csv['c_status'] = mysqli_real_escape_string($dbcon, $csv_array[8]);
//             $insert_csv['incident_date'] = mysqli_real_escape_string($dbcon, $csv_array[9]);
//             $insert_csv['complaint_date'] = mysqli_real_escape_string($dbcon, $csv_array[10]);
//             $insert_csv['last_action_taken'] = mysqli_real_escape_string($dbcon, $csv_array[11]);
//             $insert_csv['complainant_name'] = mysqli_real_escape_string($dbcon, $csv_array[12]);
//             $insert_csv['complainant_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[13]);
//             $insert_csv['complainant_email'] = mysqli_real_escape_string($dbcon, $csv_array[14]);
//             $insert_csv['complainant_address'] = mysqli_real_escape_string($dbcon, $csv_array[15]);
//             $insert_csv['suspect_name'] = mysqli_real_escape_string($dbcon, $csv_array[16]);
//             $insert_csv['suspect_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[17]);
//             $insert_csv['suspect_id'] = mysqli_real_escape_string($dbcon, $csv_array[18]);
//             $insert_csv['amount'] = mysqli_real_escape_string($dbcon, $csv_array[19]);

//             $check = $dbcon->query("SELECT * FROM excel_data WHERE ack_no='" . $insert_csv['ack_no'] . "';");
//             if ($check->num_rows > 0) {
//                 $resp_status = ['message' => 'Acknowledgment already exists'];
//                 echo json_encode($resp_status);
//             } else {
//                 if ($insert_csv['ack_no'] != '' && $insert_csv['c_status'] != '') {
//                     $result = $dbcon->query("INSERT INTO excel_data (ack_no, state_name, district_name, police_station, crime_info, category, sub_category, c_status, incident_date, complaint_date, last_action_taken, complainant_name, complainant_mobile, complainant_email, complainant_address, suspect_name, suspect_mobile, suspect_id, amount) VALUES (
//                           '" . $insert_csv['ack_no'] . "',
//                           '" . $insert_csv['state_name'] . "',
//                           '" . $insert_csv['district_name'] . "',
//                           '" . $insert_csv['police_station'] . "',
//                           '" . $insert_csv['crime_info'] . "',
//                           '" . $insert_csv['category'] . "',
//                           '" . $insert_csv['sub_category'] . "',
//                           '" . $insert_csv['c_status'] . "',
//                           '" . $insert_csv['incident_date'] . "',
//                           '" . $insert_csv['complaint_date'] . "',
//                           '" . $insert_csv['last_action_taken'] . "',
//                           '" . $insert_csv['complainant_name'] . "',
//                           '" . $insert_csv['complainant_mobile'] . "',
//                           '" . $insert_csv['complainant_email'] . "',
//                           '" . $insert_csv['complainant_address'] . "',
//                           '" . $insert_csv['suspect_name'] . "',
//                           '" . $insert_csv['suspect_mobile'] . "',
//                           '" . $insert_csv['suspect_id'] . "',
//                           '" . $insert_csv['amount'] . "'
//                       )");

//                     $resp_status = ['result' => $result];
//                     echo json_encode($resp_status);
//                 } else {
//                     $resp_status = ['message' => 'Acknowledge number or status not found'];
//                     echo json_encode($resp_status);
//                 }
//             }
//         }
//         fclose($csvFile);
//         mysqli_close($dbcon);

//         echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded.";
//     } else {
//         echo "Sorry, there was an error uploading your file.";
//     }
// }








//333333333333333333333333333333
// include('config.php');
// header('Content-Type: application/json');

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


// if (!isset($_FILES["file"]) || $_FILES["file"]["error"] == UPLOAD_ERR_NO_FILE) {
//   echo "No file selected.";
//   exit();
// }



// $target_dir = "./csv_uploads/";
// $target_file = $target_dir . basename($_FILES["file"]["name"]);
// $uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));






// // Continue with the rest of your file upload logic




// // Check if a file is selected
// if (!isset($_FILES["file"])) {
//     echo "No file selected.";
//     exit();
// }

// // Check if file already exists
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }

// // Check file size (you can set your own size limit)
// if ($_FILES["file"]["size"] > 500000) {
//     echo "Sorry, your file is too large.";
//     $uploadOk = 0;
// }

// // Allow only CSV file format
// if ($imageFileType != "csv") {
//     echo "Sorry, only CSV files are allowed.";
//     $uploadOk = 0;
// }

// // Check if $uploadOk is set to 0 by an error
// if ($uploadOk == 0) {
//     echo "Sorry, your file was not uploaded.";
// } else {
//     if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {


//       $csvFile = fopen($target_file, 'r');

//       $header = fgetcsv($csvFile, 10000, ",");

//       while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
//         $insert_csv = array();
//         $insert_csv['ack_no'] = mysqli_real_escape_string($dbcon, $csv_array[1]);
//         $insert_csv['state_name'] = mysqli_real_escape_string($dbcon, $csv_array[2]);
//         $insert_csv['district_name'] = mysqli_real_escape_string($dbcon, $csv_array[3]);
//         $insert_csv['police_station'] = mysqli_real_escape_string($dbcon, $csv_array[4]);
//         $insert_csv['crime_info'] = mysqli_real_escape_string($dbcon, $csv_array[5]);
//         $insert_csv['category'] = mysqli_real_escape_string($dbcon, $csv_array[6]);
//         $insert_csv['sub_category'] = mysqli_real_escape_string($dbcon, $csv_array[7]);
//         $insert_csv['c_status'] = mysqli_real_escape_string($dbcon, $csv_array[8]);
//         $insert_csv['incident_date'] = mysqli_real_escape_string($dbcon, $csv_array[9]);
//         $insert_csv['complaint_date'] = mysqli_real_escape_string($dbcon, $csv_array[10]);
//         $insert_csv['last_action_taken'] = mysqli_real_escape_string($dbcon, $csv_array[11]);
//         $insert_csv['complainant_name'] = mysqli_real_escape_string($dbcon, $csv_array[12]);
//         $insert_csv['complainant_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[13]);
//         $insert_csv['complainant_email'] = mysqli_real_escape_string($dbcon, $csv_array[14]);
//         $insert_csv['complainant_address'] = mysqli_real_escape_string($dbcon, $csv_array[15]);
//         $insert_csv['suspect_name'] = mysqli_real_escape_string($dbcon, $csv_array[16]);
//         $insert_csv['suspect_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[17]);
//         $insert_csv['suspect_id'] = mysqli_real_escape_string($dbcon, $csv_array[18]);
//         $insert_csv['amount'] = mysqli_real_escape_string($dbcon, $csv_array[19]);

//         $check = $dbcon->query("SELECT * FROM excel_data WHERE ack_no='" . $insert_csv['ack_no'] . "';");
//         if ($check->num_rows > 0) {
//           $resp_status->message = 'Ackownledgement already exist...!';
//           echo json_encode($resp_status);
//         } else {
//           if ($insert_csv['ack_no'] != '' && $insert_csv['c_status'] != '') {
//             $result = $dbcon->query("INSERT INTO excel_data (ack_no,state_name,district_name,police_station,crime_info,category,sub_category,
//                       c_status, incident_date,complaint_date,last_action_taken,complainant_name,complainant_mobile,
//                       complainant_email,complainant_address,suspect_name,suspect_mobile,suspect_id,amount)
//                       VALUES (
//                           '" . $insert_csv['ack_no'] . "',
//                           '" . $insert_csv['state_name'] . "',
//                           '" . $insert_csv['district_name'] . "',
//                           '" . $insert_csv['police_station'] . "',
//                           '" . $insert_csv['crime_info'] . "',
//                           '" . $insert_csv['category'] . "',
//                           '" . $insert_csv['sub_category'] . "',
//                           '" . $insert_csv['c_status'] . "',
//                           '" . $insert_csv['incident_date'] . "',
//                           '" . $insert_csv['complaint_date'] . "',
//                           '" . $insert_csv['last_action_taken'] . "',
//                           '" . $insert_csv['complainant_name'] . "',
//                           '" . $insert_csv['complainant_mobile'] . "',
//                           '" . $insert_csv['complainant_email'] . "',
//                           '" . $insert_csv['complainant_address'] . "',
//                           '" . $insert_csv['suspect_name'] . "',
//                           '" . $insert_csv['suspect_mobile'] . "',
//                           '" . $insert_csv['suspect_id'] . "',
//                           '" . $insert_csv['amount'] . "'
//                       );");

//             $resp_status->result = $result;
//             echo json_encode($resp_status);
//           } else {
//             $resp_status->message = 'Not found acknownledgement number';
//             echo json_encode($resp_status);
//           }
//         }
//       }
//       fclose($csvFile);
//       mysqli_close($dbcon);







//         echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded.";
//     } else {
//         echo "Sorry, there was an error uploading your file.";
//     }
// }




//222222222222222222222222222

// include('config.php');
// header('Content-Type: application/json');

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// define('CSV_PATH', "http://127.0.0.1/ccp_new-current/api/csv_uploads/");

// $resp_status = new stdClass;
// $upload_file = CSV_PATH . basename($_FILES['fileToUpload']['name']);
// $filename = basename($_FILES['fileToUpload']['name']);

// if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $upload_file)) {
//   echo '{"success":"File is valid, and was successfully uploaded"}';
// } else {
//   echo '{"failed":"Upload failed"}';
//   exit;
// }

//$csv_file = CSV_PATH . $filename;

// $csvFile = fopen($target_file, 'r');

// $header = fgetcsv($csvFile, 10000, ",");

// while (($csv_array = fgetcsv($csvFile, 10000, ",")) !== false) {
//   $insert_csv = array();
//   $insert_csv['ack_no'] = mysqli_real_escape_string($dbcon, $csv_array[1]);
//   $insert_csv['state_name'] = mysqli_real_escape_string($dbcon, $csv_array[2]);
//   $insert_csv['district_name'] = mysqli_real_escape_string($dbcon, $csv_array[3]);
//   $insert_csv['police_station'] = mysqli_real_escape_string($dbcon, $csv_array[4]);
//   $insert_csv['crime_info'] = mysqli_real_escape_string($dbcon, $csv_array[5]);
//   $insert_csv['category'] = mysqli_real_escape_string($dbcon, $csv_array[6]);
//   $insert_csv['sub_category'] = mysqli_real_escape_string($dbcon, $csv_array[7]);
//   $insert_csv['c_status'] = mysqli_real_escape_string($dbcon, $csv_array[8]);
//   $insert_csv['incident_date'] = mysqli_real_escape_string($dbcon, $csv_array[9]);
//   $insert_csv['complaint_date'] = mysqli_real_escape_string($dbcon, $csv_array[10]);
//   $insert_csv['last_action_taken'] = mysqli_real_escape_string($dbcon, $csv_array[11]);
//   $insert_csv['complainant_name'] = mysqli_real_escape_string($dbcon, $csv_array[12]);
//   $insert_csv['complainant_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[13]);
//   $insert_csv['complainant_email'] = mysqli_real_escape_string($dbcon, $csv_array[14]);
//   $insert_csv['complainant_address'] = mysqli_real_escape_string($dbcon, $csv_array[15]);
//   $insert_csv['suspect_name'] = mysqli_real_escape_string($dbcon, $csv_array[16]);
//   $insert_csv['suspect_mobile'] = mysqli_real_escape_string($dbcon, $csv_array[17]);
//   $insert_csv['suspect_id'] = mysqli_real_escape_string($dbcon, $csv_array[18]);
//   $insert_csv['amount'] = mysqli_real_escape_string($dbcon, $csv_array[19]);

//   $check = $dbcon->query("SELECT * FROM excel_data WHERE ack_no='" . $insert_csv['ack_no'] . "';");
//   if ($check->num_rows > 0) {
//     $resp_status->message = 'Ackownledgement already exist...!';
//     echo json_encode($resp_status);
//   } else {
//     if ($insert_csv['ack_no'] != '' && $insert_csv['c_status'] != '') {
//       $result = $dbcon->query("INSERT INTO excel_data (ack_no,state_name,district_name,police_station,crime_info,category,sub_category,
//                 c_status, incident_date,complaint_date,last_action_taken,complainant_name,complainant_mobile,
//                 complainant_email,complainant_address,suspect_name,suspect_mobile,suspect_id,amount)
//                 VALUES (
//                     '" . $insert_csv['ack_no'] . "',
//                     '" . $insert_csv['state_name'] . "',
//                     '" . $insert_csv['district_name'] . "',
//                     '" . $insert_csv['police_station'] . "',
//                     '" . $insert_csv['crime_info'] . "',
//                     '" . $insert_csv['category'] . "',
//                     '" . $insert_csv['sub_category'] . "',
//                     '" . $insert_csv['c_status'] . "',
//                     '" . $insert_csv['incident_date'] . "',
//                     '" . $insert_csv['complaint_date'] . "',
//                     '" . $insert_csv['last_action_taken'] . "',
//                     '" . $insert_csv['complainant_name'] . "',
//                     '" . $insert_csv['complainant_mobile'] . "',
//                     '" . $insert_csv['complainant_email'] . "',
//                     '" . $insert_csv['complainant_address'] . "',
//                     '" . $insert_csv['suspect_name'] . "',
//                     '" . $insert_csv['suspect_mobile'] . "',
//                     '" . $insert_csv['suspect_id'] . "',
//                     '" . $insert_csv['amount'] . "'
//                 );");

//       $resp_status->result = $result;
//       echo json_encode($resp_status);
//     } else {
//       $resp_status->message = 'Not found acknownledgement number';
//       echo json_encode($resp_status);
//     }
//   }
// }
// fclose($csvFile);
// mysqli_close($dbcon);



// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     // Check if a file was uploaded
//     if (isset($_FILES["file"])) {
//         $file = $_FILES["file"];

//         // Check if the file is a CSV
//         $fileExtension = pathinfo($file["name"], PATHINFO_EXTENSION);
//         if ($fileExtension == "csv") {
//             // Move the file to your desired server directory
//             $targetDirectory = "http://127.0.0.1/ccp_new-current/api/csv_uploads/";
//             $targetPath = $targetDirectory . $file["name"];

//             move_uploaded_file($file["tmp_name"], $targetPath);

//             // Read CSV data
//             $csvData = array_map('str_getcsv', file($targetPath));

//             // Process CSV data and store in the database
//             foreach ($csvData as $row) {
//                 // $name = $row[0];  // Assuming the first column is for name
//                 // $email = $row[1]; // Assuming the second column is for email
//                 // $password = $row[2]; // Assuming the third column is for password



//                 // Perform SQL query to insert data into the database
//                 $sql = "INSERT INTO your_table_name (name, email, password) VALUES ('$name', '$email', '$password')";

//                 if ($conn->query($sql) === TRUE) {
//                     echo "Record inserted successfully.<br>";
//                 } else {
//                     echo "Error: " . $sql . "<br>" . $conn->error;
//                 }
//             }

//             // Optionally, you may want to delete the CSV file after processing
//             // unlink($targetPath);
//         } else {
//             echo "Only CSV files are allowed.";
//         }
//     } else {
//         echo "No file uploaded.";
//     }
// }

// // Close the database connection
// $conn->close();


// define('CSV_PATH', 'C:\xampp\htdocs\mani_api');
// define('CSV_PATH', 'http://44.211.166.253/api/ccp/');
