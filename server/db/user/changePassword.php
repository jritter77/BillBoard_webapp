<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("UPDATE User 
    SET 
        pass_hash = :pass_hash
    WHERE 
        user_id = :user_id
    ");

// get params from request
$req = json_decode($_POST['req']);

// create password hash
$hash = password_hash($req->pass, PASSWORD_DEFAULT);

// fill in parameters
$stmt->bindValue(':user_id', $req->user_id);
$stmt->bindValue(':pass_hash', $hash);


// Execute the sqlite3 command
$result = $stmt->execute();

// Return SUCCESS flag
echo json_encode("SUCCESS");

?>