<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 24.11.2018
 * Time: 23:00
 */

include_once '../../config/postConfig.php';
include_once '../../models/subject.php';

$subject = new Subject($db);

$data = json_decode(file_get_contents("php://input"));


$auth2 = authorizate($data->jwt);
if (!$auth ||(isset($auth2["decoded"]))) {

    $subject->id = $data->id;
    $subject->name = $data->name;
    $subject->id_author = $data->idAuthor;
    $subject->nOQuestions = $data->nOQuestions;
    $subject->multipleChoice = $data->multipleChoice;
    $subject->separatePage = $data->separatePage;
    $subject->canBack = $data->canBack;
    $subject->limitedTime = $data->limitedTime;
    $subject->course = $data->course;
    $subject->time = $data->time;
    $subject->description = $data->description;
	$subject->randomize = $data->randomize;

    $stmt = $subject->update();

    if ($stmt > 0) {
        http_response_code(200);
        echo json_encode(array("message" => "Subject was updated", "id" => $stmt));
    } else {
        http_response_code(201);
        echo json_encode(array("message" => "Unable to update subject."));
    }
}else {
    http_response_code(201);

    echo json_encode(
        array("message" => "UnAuthorized")
    );
}