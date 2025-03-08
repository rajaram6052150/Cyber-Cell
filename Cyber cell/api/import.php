<?php
include 'db.php';
if (isset($_POST["Import"])) {
	echo $filename = $_FILES["file"]["tmp_name"];
	$escaped_value = mysqli_real_escape_string($conn, $filename);
	if ($_FILES["file"]["size"] > 0) {
		$file = fopen($filename, "r");
		while (($emapData = fgetcsv($file, 100000, ",")) !== FALSE) {
			$sql = "INSERT INTO excel_data(
			ack_no, state_name, district_name, station_name, crime_info, 
			category, sub_category, c_status, incident_date, complaint_date, last_action_date, 
			complainant_name, complainant_mobile, complainant_email, complainant_address, 
			suspect_name, suspect_mobile, suspect_id_no, amount
			)VALUES(
			'$emapData[1]','$emapData[2]','$emapData[3]','$emapData[4]','$emapData[5]',
			'$emapData[6]','$emapData[7]','$emapData[8]','$emapData[9]','$emapData[10]',
			'$emapData[11]','$emapData[12]','$emapData[13]','$emapData[14]','$emapData[15]',
			'$emapData[16]','$emapData[17]','$emapData[18]','$emapData[19]')";
			$result = mysqli_query($conn, $sql);
			if (!$result) {
				echo "<script>alert('Invalid File:Please Upload CSV File')</script>";
				header("location: index.php");
			}
		}
		fclose($file);
		echo "<script>alert('CSV File has been successfully Imported')</script>";
	} else {
		echo "<script>alert('File too large')</script>";
	}
} else {
	echo "<script>alert('File not imported')</script>";
}
mysqli_close($conn);
