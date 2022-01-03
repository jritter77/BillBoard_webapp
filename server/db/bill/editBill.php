<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE Bill 
    SET 
        bill_name = :bill_name,
        bill_amt = :bill_amt,
        bill_type = :bill_type,
        bill_day_due = :bill_day_due,
        bill_month_due = :bill_month_due,
        bill_year_due = :bill_year_due,
        bill_freq = :bill_freq
    WHERE 
        bill_id = :bill_id
");

// get parameters from request
$req = json_decode($_POST['req']);



// fill in parameters
$stmt->bindValue(':bill_id', $req->bill_id);
$stmt->bindValue(':bill_name', $req->bill_name);
$stmt->bindValue(':bill_amt', $req->bill_amt);
$stmt->bindValue(':bill_type', $req->bill_type);
$stmt->bindValue(':bill_day_due', $req->bill_day_due);
$stmt->bindValue(':bill_month_due', $req->bill_month_due);
$stmt->bindValue(':bill_year_due', $req->bill_year_due);
$stmt->bindValue(':bill_freq', $req->bill_freq);





// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode("SUCCESS");

$db->close();
unset($db);

?>