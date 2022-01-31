<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("DELETE FROM Payment WHERE pay_id = :pay_id");

// get parameters from request
$req = json_decode($_POST['req']);



// fill in parameters
$stmt->bindValue(':pay_id', $req->pay_id);



// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode("SUCCESS");

$db->close();
unset($db);

?>