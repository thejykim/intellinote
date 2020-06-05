<?php

ini_set('display_errors', 1);
error_reporting(-1);

$email = $_POST["email"];
$hash = hash("sha256", $email);

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "INSERT INTO userMap
    (id, username)
    VALUES (?,?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $id, $chosenUsername);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    die("Connection failed - try again in a few moments.");
}

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        echo $row["username"];
    }
} else {
    echo "User not found!";
}

$connection->close();
?>
