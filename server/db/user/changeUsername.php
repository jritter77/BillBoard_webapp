<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE User 
    SET 
        user_name = :user_name
    WHERE 
        user_id = :user_id
    ");

// get params from request
$req = json_decode($_POST['req']);


// fill in parameters
$stmt->bindValue(':user_id', $req->user_id);
$stmt->bindValue(':user_name', $req->user_name);


// Execute the sqlite3 command
$result = $stmt->execute();

// Return SUCCESS flag
echo json_encode("SUCCESS");

?>