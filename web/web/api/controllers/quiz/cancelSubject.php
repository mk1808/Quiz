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

$subject->id = $data->id;
$subject->shared = 0;

$auth2 = authorizate($data->jwt);
if (!$auth ||(isset($auth2["decoded"]) && ($auth2["decoded"]->role == 1)) ) {
    $stmt = $subject->updateShared();

    if ($stmt > 0) {
        http_response_code(200);
        echo json_encode(array("message" => "Subject was updated"));
    } else {
        http_response_code(201);
        echo json_encode(array("message" => "Unable to update subject."));
    }
}
else {
    http_response_code(201);
    echo json_encode(
        array("message" => "UnAuthorized")
    );
}