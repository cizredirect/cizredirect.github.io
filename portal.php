<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Process the form data
    $salutation = $_POST['salutation'];
    $first_name = $_POST['first_name'];
    $middle_name = $_POST['middle_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $degree = $_POST['degree'];
    $agree = $_POST['agree'];

    // Upload the form data to Google Drive
    require 'vendor/autoload.php'; // Include Google PHP Client Library
    $client = new Google\Client();
    $client->useApplicationDefaultCredentials();
    $client->addScope(Google_Service_Drive::DRIVE);
    $driveService = new Google_Service_Drive($client);

    $fileMetadata = new Google_Service_Drive_DriveFile(array(
        'name' => 'form_data.txt' // Use .txt as the extension
    ));
    $fileData = "Salutation: $salutation\nFirst Name: $first_name\nMiddle Name: $middle_name\nLast Name: $last_name\nEmail: $email\nDOB: $dob\nGender: $gender\nDegree: $degree\nAgree: $agree";

    // Perform a multipart upload
    $file = $driveService->files->create($fileMetadata, array(
        'data' => $fileData,
        'mimeType' => 'text/plain',
        'uploadType' => 'multipart'
    ));

    // Redirect to a thank you page
    header('Location: thank_you.html');
    exit();
}
?>
