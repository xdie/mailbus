<?php
header('Content-Type: application/json');

require_once '../inc/db.php'; // The mysql database connection script
$query="select ID, NAME, EMAIL, STATUS from users order by status,id desc";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
}
# JSON-encode the response
echo $json_response = json_encode($arr);

?>
