<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("INSERT INTO User (
        user_name,
        user_email,
        pass_hash
    )
    VALUES (
        :user_name,
        :user_email,
        :pass_hash
    )");

// get parameters from request
$req = json_decode($_POST['req']);

// create password hash
$hash = password_hash($req->pass, PASSWORD_DEFAULT);

// fill in parameters
$stmt->bindValue(':user_name', $req->user_name);
$stmt->bindValue(':user_email', $req->user_email);
$stmt->bindValue(':pass_hash', $hash);




// Execute the sqlite3 command
$result = $stmt->execute();

// Return the user_id of the new User
echo json_encode($db->lastInsertRowId());

?>