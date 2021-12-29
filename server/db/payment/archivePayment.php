<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE Payment 
    SET 
        archived = :archived
    WHERE 
        pay_id = :pay_id
");

// get parameters from request
$req = json_decode($_POST['req']);



// fill in parameters
$stmt->bindValue(':pay_id', $req->pay_id);
$stmt->bindValue(':archived', $req->archived);



// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode("SUCCESS");

?>