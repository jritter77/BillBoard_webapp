<?php
// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// get params from request
$req = json_decode($_GET['req']);

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM 
                      Payment, Bill 
                      WHERE Payment.bill_id = Bill.bill_id
                      AND user_id = :user_id
                      order by pay_id desc");

// fill in parameters
$stmt->bindValue(':user_id', $req->user_id);

// Execute the sqlite3 command
$result = $stmt->execute();

// extract data into array 
$myArr = array(); 
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  array_push($myArr, $row);
}

// Return user instance 
echo json_encode($myArr);


$db->close();
unset($db);

?>