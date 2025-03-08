<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST,GET');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// Include the database connection configuration
include 'config.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Check if the 'username' parameter is set in the POST request
  if (isset($_POST['username'])) {

    // Sanitize the input to prevent potential security issues
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);

    // Prepare and execute the SQL query
    $sql = "SELECT name, email,role FROM users WHERE username = '$username'";
    $result = $dbcon->query($sql);

    // Check if the query was successful
    if ($result) {

      // Check if any rows were returned
      if ($result->num_rows > 0) {

        // Fetch the data
        $row = $result->fetch_assoc();

        // Prepare JSON response
        $response = [
          'name' => $row['name'],
          'email' => $row['email'],
          'designation' => $row['role']
        ];

        // Output JSON response
        header('Content-Type: application/json');
        echo json_encode($response);

      } else {
        // User not found
        $response = ['error' => 'No user found with the given username'];
        header('Content-Type: application/json');
        echo json_encode($response);
      }

    } else {
      // Error executing the query
      $response = ['error' => 'Error executing the query: ' . $dbcon->error];
      header('Content-Type: application/json');
      echo json_encode($response);
    }

  } else {
    // No 'username' parameter provided
    $response = ['error' => 'Please provide a \'username\' parameter in the POST request'];
    header('Content-Type: application/json');
    echo json_encode($response);
  }

} else {
  // Unsupported request method
  $response = ['error' => 'This endpoint only supports POST requests'];
  header('Content-Type: application/json');
  echo json_encode($response);
}

// Close the database connection
$dbcon->close();



