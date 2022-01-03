<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO Payment (
        bill_id,
        pay_day,
        pay_month,
        pay_year,
        pay_amt
    )
    VALUES (
        :bill_id,
        :pay_day,
        :pay_month,
        :pay_year,
        :pay_amt
    )");

// get parameters from request
$req = json_decode($_POST['req']);



// fill in parameters
$stmt->bindValue(':bill_id', $req->bill_id);
$stmt->bindValue(':pay_day', $req->pay_day);
$stmt->bindValue(':pay_month', $req->pay_month);
$stmt->bindValue(':pay_year', $req->pay_year);
$stmt->bindValue(':pay_amt', $req->pay_amt);


// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode($db->lastInsertRowId());


$db->close();
unset($db);

?>