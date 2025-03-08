  <?php
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Credentials:true");
  header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
  header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  include 'config.php';
  $array = json_decode($_POST['values']);
  $id = $array[26];
  if ($id == NULL) {
      $dbcon->query("INSERT INTO bank_details (
      bank_name,
      bank_officer_name,
      designation,
      bank_branch_name,
      bank_ifsc,
      bank_subject,
      bank_email,
      bank_city
  ) VALUES (
      '$array[0]',
      '$array[1]',
      '$array[2]',
      '$array[3]',
      '$array[4]',
      '$array[5]',
      '$array[6]',
      '$array[7]'
  );");
      mysqli_close($dbcon);
  } else {
      $check = $dbcon->query("SELECT * FROM bank_details where id='$id';");
      if ($check->num_rows > 0) {
          $result = mysqli_fetch_assoc($check);
          $dbcon->query("UPDATE bank_details SET bank_name='$array[0]',bank_officer_name='$array[1]',designation='$array[2]',
          bank_branch_name='$array[3]',bank_ifsc='$array[4]',bank_subject='$array[5]',bank_email='$array[6]',bank_city='$array[7]'
          where id='$id';");
          mysqli_close($dbcon);
      }
  }
