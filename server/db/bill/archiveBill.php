<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE Bill 
    SET 
        archived = :archived
    WHERE 
        bill_id = :bill_id
");

// get parameters from request
$req = json_decode($_POST['req']);



// fill in parameters
$stmt->bindValue(':bill_id', $req->bill_id);
$stmt->bindValue(':archived', $req->archived);



// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode("SUCCESS");

?>