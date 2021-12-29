<?php
// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// get params from request
$req = json_decode($_GET['req']);

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM Bill WHERE bill_id = :bill_id");

// fill in parameters
$stmt->bindValue(':bill_id', $req->bill_id);

// Execute the sqlite3 command
$result = $stmt->execute();

// extract data into array 
$myArr = array(); 
while ($row = $result->fetchArray()) {
  array_push($myArr, $row);
}

// Return user instance 
echo json_encode($myArr[0]);

?>