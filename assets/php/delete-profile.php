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

$sql = "DELETE FROM userMap
    WHERE username = ?";
$stmt = $connection->prepare($sql);
<<<<<<< HEAD
$stmt->bind_param("s", $id);
=======
$stmt->bind_param("s", $username);
>>>>>>> ccedb35c4d8ec2674f96f9f06d853af99b73b3ae
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
