<?php

// Connect to database 
$db = new SQLite3('../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT user_id, pass_hash FROM User WHERE user_name = :user_name");

// get req params
$req = json_decode($_POST['req']);


// fill in parameters
$stmt->bindValue(':user_name', $req->user_name);


// Execute the sqlite3 command
$result = $stmt->execute();


// store results in data array
$data = array();
while ($res = $result->fetchArray(SQLITE3_ASSOC)) {
    array_push($data, $res);
}

if (count($data) < 1) {
    exit(0);
}

// start session and return session id if credentials are verified
if (password_verify($req->pass, $data[0]['pass_hash'])) {
    session_start();
    $token = array();
    $_SESSION['user_id'] = $data[0]['user_id'];
    $_SESSION['user'] = $req->user_name;
    $token['user_id'] = $data[0]['user_id'];
    $token['user'] = $req->user_name;
    $token['session'] = session_id();
    echo json_encode($token);
}


  

$db->close();
unset($db);



?>