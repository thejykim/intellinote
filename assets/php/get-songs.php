<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["username"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "SELECT * FROM userSongs
    WHERE username = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    die("Connection failed - try again in a few moments.");
}

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        echo $row["title"] . "|SEPARATOR|" . $row["username"] . "|SEPARATOR|" . $row["dateCreated"] . "|SEPARATOR|" . $row["dateModified"] . "|SEPARATOR|" . $row["songData"] . "|SEPARATOR|" . $row["songID"] . "?";
    }
} else {
    echo "";
}

$connection->close();
?>
