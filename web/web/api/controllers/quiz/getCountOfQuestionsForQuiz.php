<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 29.11.2018
 * Time: 20:31
 */

include_once '../../config/postConfig.php';
include_once '../../models/subject.php';

$data = json_decode(file_get_contents("php://input"));
$subject = new Subject($db);

$auth2 = authorizate($data->jwt);
if (!$auth || (isset($auth2["decoded"]))) {

    if (!empty($data->id)) {

        $ans = $subject->getQuestionCountForQuiz($data->id);
        http_response_code(200);
        echo json_encode($ans);
    } else {
        http_response_code(201);
        echo json_encode(array("message" => "Puste dane"));
    }
} else {
    http_response_code(201);

    echo json_encode(
        array("message" => "UnAuthorized")
    );
}