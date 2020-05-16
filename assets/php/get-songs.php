<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["userID"];

$servername = "167.88.161.21";
$username = "thejykco_sheets";
$password = "omitted";
$dbname = "thejykco_sheets_user";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT title, userID, dateCreated, dateModified, songData, songID FROM userSongs WHERE userID=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    die("Connection failed - try again in a few moments.");
}

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        echo $row["title"] . "|" . $row["userID"] . "|" . $row["dateCreated"] . "|" . $row["dateModified"] . "|" . $row["songData"] . "?";
    }
} else {
    echo "";
}

$connection->close();
?>
