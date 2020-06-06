<?php

ini_set('display_errors', 1);
error_reporting(-1);

$email = $_POST["email"];
$hash = hash("sha256", $email);
$chosenUsername = $_POST["username"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

// duplicate check

$dupconnection = new mysqli($servername, $username, $password, $dbname);

if ($dupconnection->connect_error) {
    die("Connection failed: " . $dupconnection->connect_error);
}
$dupsql = "SELECT * FROM userMap
    WHERE id=? OR username=?";
$dupstmt = $dupconnection->prepare($dupsql);
$dupstmt->bind_param("ss", $hash, $chosenUsername);
$dupstmt->execute();
$dupresult = $dupstmt->get_result();

if ($dupresult === false) {
    die("Connection failed - try again in a few moments.");
}

if (mysqli_num_rows($dupresult) > 0) {
    $dupconnection->close();
    exit("Already registered, or username taken");
}

$dupconnection->close();

// if okay, proceed with insertion

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
$sql = "INSERT INTO userMap
    (id, username)
    VALUES (?,?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $hash, $chosenUsername);
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
