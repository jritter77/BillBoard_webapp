<?php

// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT user_id, user_name, user_email FROM User");


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