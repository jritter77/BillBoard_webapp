<?php
// Connect to database 
$db = new SQLite3('../../../data/BillBoard.db');

// get params from request
$req = json_decode($_GET['req']);

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM Bill WHERE user_id = :user_id AND (archived != 1 OR archived is NULL) 
                      order by bill_year_due, bill_month_due, bill_day_due
                      limit :limit
                      offset :offset");

// fill in parameters
$stmt->bindValue(':user_id', $req->user_id);
$stmt->bindValue(':limit', $req->limit);
$stmt->bindValue(':offset', $req->offset);

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