<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// Include the database connection configuration file
include 'config.php';

// Function to count total cases, pending cases, and approved cases
function getCaseCounts($connection) {
  $query = "SELECT COUNT(*) AS total_cases,
                     SUM(CASE WHEN approved = 'N' THEN 1 ELSE 0 END) AS pending_cases,
                     SUM(CASE WHEN approved = 'Y' THEN 1 ELSE 0 END) AS approved_cases
              FROM excel_data";

  $result = mysqli_query($connection, $query);

  if (!$result) {
    die("Query failed: " . mysqli_error($connection));
  }

  $row = mysqli_fetch_assoc($result);

  return $row;
}
// Call the function to get case counts using the existing connection
$caseCounts = getCaseCounts($dbcon);


$response = [
  'total' => $caseCounts['total_cases'],
  'pending' => $caseCounts['pending_cases'],
  'approved' => $caseCounts['approved_cases']
];

// Close the database connection
mysqli_close($dbcon);

// Convert the result to JSON format
$jsonData = json_encode($response);

// Set response header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo $jsonData;
?>
