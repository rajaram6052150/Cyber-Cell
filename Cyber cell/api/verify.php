<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';
include 'jwt/JWT.php';
include 'jwt/Key.php';
include 'jwt/ExpiredException.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

date_default_timezone_set('Asia/Kolkata');

if ($_POST['token'] != '') {
    $token = $_POST['token'];
    $resp_status = new stdClass;
    $publicKey = <<<EOD
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApiYPBx30b5s6vc7AEuJa
e8g+SVFx7/5bvse0OOKsi2J5gBk7Pv1ksSnWvKyGGN+2xzjINm0kWlOvpojP0toX
DpGNWKCOp/3XyoqdYxPpBGIPnr2/C7Wa/FsOknz4lUoif95aJh08J7BUbEB8IUwW
4D+iYEd+k9A0deRH6+aZh7QVny/Wf4sEYwbYUprpfqk6+dTVLQ02WBEhUboYS1me
eiR8Wz0q+qj5ZFQg5edxhtEiUNoYTaY+T3igKdfPD1uHYomQ1rsZM9y0Ly/I3E7z
m3sCYBlCFmSyiOMU8xNBES7d5y/6H5pYebs3nQ6I/uMMn3d6a40rNawlTz3sOCTx
NQIDAQAB
-----END PUBLIC KEY-----
EOD;

    try {
        $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
        $email=$decoded->data->email;
        $check = $dbcon->query("SELECT * from users where email='$email';");
        if ($check->num_rows > 0) {
            $result=mysqli_fetch_assoc($check);
            $resp_status->status = 'ok';
            $resp_status->name = $decoded->data->name;
            $resp_status->email = $decoded->data->email;
            $resp_status->role = $result['role'];
            $resp_status->id = $result['id'];
            echo json_encode($resp_status);
        } else {
            $resp_status->status = 'error';
            $resp_status->message = 'kindly check request parameters';
            echo json_encode($resp_status);
        }
    } catch (Exception $e) {
        $resp_status->status = 'error';
        $resp_status->message = $e->getMessage();
        echo json_encode($resp_status);
    }
    mysqli_close($dbcon);
}