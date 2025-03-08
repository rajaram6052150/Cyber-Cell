<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials:true");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

include 'config.php';

$resp_status = new stdClass;
$bill=$_POST['bill'];
$time=time();
$check = $dbcon->query("SELECT count(id) as id FROM product_invoice where invoice_no like '%$bill%';");
if ($check->num_rows > 0) {
        $result = mysqli_fetch_assoc($check);
        $id=$result['id']+1;
        $invoice=date('Y').$bill.str_pad($id, 4, '0', STR_PAD_LEFT);
        $resp_status->id = $id;
        $resp_status->invoiceno=$invoice;
        $dbcon->query("INSERT INTO product_invoice (invoice_no,created_date) VALUES ('$invoice','$time');");
        echo json_encode($resp_status);
}
else{
    $id=1;
    $invoice=date('Y').$bill.str_pad($id, 4, '0', STR_PAD_LEFT);
    $resp_status->id=$id;
    $resp_status->invoiceno=$invoice;
    $dbcon->query("INSERT INTO product_invoice (invoice_no,created_date) VALUES ('$invoice','$time');");
    echo json_encode($resp_status);
}

mysqli_close($dbcon);
