<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 27.12.2018
 * Time: 21:49
 */

include_once '../../config/postConfig.php';
include_once '../../models/SubjectQuestions.php';

$data = json_decode(file_get_contents("php://input"));

$auth2 = authorizate($data->jwt);
if (!$auth ||(isset($auth2["decoded"]) && ($auth2["decoded"]->role == 1)) ) {

$subQues = new SubjectQuestions($db);
    $subQues->idSubject = $data->idSubject;
    $subQues->category = $data->category;
    $subQues->number = $data->number;

    $stmt = $subQues->create();
    if( $stmt > 0){
        http_response_code(200);
        echo json_encode(array("message" => "SubQues was created", "id" => $stmt));
    } else {
        http_response_code(201);
        echo json_encode(array("message" => "Unable to create SubQues."));
    }
} else {
    http_response_code(201);
    echo json_encode(array("message" => "unAuthorized"));
}
