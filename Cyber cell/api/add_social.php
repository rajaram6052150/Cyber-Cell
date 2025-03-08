<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
$array = json_decode($_POST['values']);
$id = $array[5];
if ($id == NULL) {
    $dbcon->query("INSERT INTO social_media (
    media_name,
    media_designation,
    media_subject,
    media_email,
    media_city   
) VALUES (
    '$array[0]',
    '$array[1]',
    '$array[2]',
    '$array[3]',
    '$array[4]'
);");   
    mysqli_close($dbcon);
} else {
    $check = $dbcon->query("SELECT * FROM social_media where id='$id';");
    if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $dbcon->query("UPDATE social_media SET media_name='$array[0]',media_designation='$array[1]',media_subject='$array[2]',
        media_email='$array[3]',media_city='$array[4]' where id='$id';");
        mysqli_close($dbcon);
    }
}
