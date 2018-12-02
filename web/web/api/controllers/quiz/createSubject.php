<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 24.11.2018
 * Time: 23:00
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/subject.php';

$database = new Database();
$db = $database->getConnection();

$subject = new Subject($db);

$data = json_decode(file_get_contents("php://input"));

$subject->name = $data->name;
$subject->id_author = $data->author;
$subject->nOQuestions = $data->nOQuestions;
$subject->multipleChoice = $data->multipleChoice;
$subject->separatePage = $data->separatePage;
$subject->canBack = $data->canBack;
$subject->limitedTime = $data->limitedTime;
$subject->course = $data->course;
$subject->time = $data->time;
$subject->description = $data->description;


if($subject->create()){
    http_response_code(200);
    echo json_encode(array("message" => "Subject was created."));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create subject."));
}
