<?php
//$dbcon=mysqli_connect("localhost","root","admin123","ajinventory");
$dbcon = mysqli_connect("localhost","naren","admin@123","cyber");

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
