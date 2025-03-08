<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'jwt/JWT.php';

use Firebase\JWT\JWT;

if ($_POST['username'] != '') {
    date_default_timezone_set('Asia/Kolkata');

    include 'config.php';
    $resp_status = new stdClass;
    $privateKey = <<<EOD
-----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEApiYPBx30b5s6vc7AEuJae8g+SVFx7/5bvse0OOKsi2J5gBk7
Pv1ksSnWvKyGGN+2xzjINm0kWlOvpojP0toXDpGNWKCOp/3XyoqdYxPpBGIPnr2/
C7Wa/FsOknz4lUoif95aJh08J7BUbEB8IUwW4D+iYEd+k9A0deRH6+aZh7QVny/W
f4sEYwbYUprpfqk6+dTVLQ02WBEhUboYS1meeiR8Wz0q+qj5ZFQg5edxhtEiUNoY
TaY+T3igKdfPD1uHYomQ1rsZM9y0Ly/I3E7zm3sCYBlCFmSyiOMU8xNBES7d5y/6
H5pYebs3nQ6I/uMMn3d6a40rNawlTz3sOCTxNQIDAQABAoIBAQCf540bCmdQapN0
TeFpy1POQgBATBReJ+1ghY8cGHx7gYDyGlZ83x7jqyKyX1CH6/dbcXiveQc9r8Ej
hBSQF7mNGeRxYcUqRRJEKngi/OyMfVwPKQsPV+8b5P73WTNdawYdDoCwof5dLEV0
EfPlj/eMR3IdO3HFDOMQe24EyeEFSmyilfq9v1j3LjbXvl2v+AMAX1DfId/So3qF
R9hyjaKK1lYZJLQ6EJ4iP8o1Yg/MHOZ8y/PqcXe8LfhcH+qGS01Su6B2fghQ9y6V
5s/fxxo4HNYoUGb67r0fmEas8UNh4pmmqOL/dpmOU923yjoR7KaCLQ6Blxp7WevU
aMzg6zHZAoGBANvWk584JX5Bdm9Xt1Kv80IIPaK4U68NKPmXC33iL61BkaSjtSeF
uNgGV3RanQyIPQtR17ItC8plSd041Whe1ppwcxCF13TQ1iByEuRS717q7bYsRGk+
4hUu/TCxzo4GTHujcBViVzD4bKhiV+pZPsRf/qdfkDqKB7Pq/+O18iyPAoGBAMF6
m25n1WM7Z7/rB95HvkO4WFawwA8k518Hw4wbMgXWX42Edg9tSba1XREdUooltbnh
0TZhAGYsYbRUY+OZmKT31Mke8tvsH5KS0soYfwtH2UrJDV8n5gElTrghtT0GwKp0
xMgXZm25s33eFdqsyk+Ky6kDFbTHMPvRLQnGqy/7AoGBANaCDhFya8NChRon8Q2R
+j8YY2v/iEhrAuxn4iK3LeZU8JRB2WXzKWZA6dzy/gNYfJgrB9kn8zVOmEBwUGxC
/gw8ZUpeDtpBXG7UYHLCKifn/IOhti8r2Nbqvstg9DfJFaAe3iM/jeyOuxeivj5B
Tum28XjH2qgEP3fjekTrKJ8pAoGBAIboN/Le4dKkfG48sqrSOZ+8rZQdAH5OzCne
HwLVf6bEWLIzt6KAINMOWQty97euHa20AI47Suzza1kzMsdjtSTqTevC8bJZTZaF
XAdg100FV0UnNXSxPFZ2LhKEJnyb9cGlVAT1FA3UW4ybS3/D1flqnSGHLh50efpM
W2wipAD7AoGBAJaUas/c8vs/p4keo4rgRICgInG7iWUySPY7ZktHO/TE2fpqKjbs
f94oAH/v2YG+vWXaPKG+ovDqgqLohbOTlcMPloZqRcs3rCRjIRvVI8RSU9x1L8PD
AOBTZbyuwbm6FE9XGaX+v4xABfveMtReDp+K3HkHjJR8gipMYyO7l7XC
-----END RSA PRIVATE KEY-----
EOD;

    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $date = time();

    $check = $dbcon->query("SELECT * from users where username='$username';");

    if ($check->num_rows > 0) {
        $resp_status->status = 'error';
        $resp_status->message = 'Username already exist';
        echo json_encode($resp_status);
    } else {
        $iat = time();
        $nbf = $iat + 0;
        $exp = $iat + 7200;
        $payload = [
            'iat' => $iat,
            'nbf' => $nbf,
            'exp' => $exp,
            "data" => [
                "email" => $email,
                "name" => $name
            ]
        ];
        $token = JWT::encode($payload, $privateKey, 'RS256');
        $dbcon->query("INSERT INTO users (username,password,name,email,datecreated,token,role) VALUES ('$username','$password','$name','$email','$date','$token','user');");

        $resp_status->status = 'ok';
        $resp_status->token = $token;
        $resp_status->expire = $exp;
        $resp_status->email = $email;
        $resp_status->name = $name;
        echo json_encode($resp_status);
    }
    mysqli_close($dbcon);
}