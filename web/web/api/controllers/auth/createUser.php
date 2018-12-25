<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 20.11.2018
 * Time: 23:24
 */

include_once '../../config/postConfig.php';
include_once '../../models/user.php';

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));


$user->name = $data->name;
$user->surname = $data->surname;
$user->email = $data->email;
$user->password = $data->password;
$user->role = "2";
$user->course = $data->course;

if($user->create()){
    http_response_code(200);
    echo json_encode(array("message" => "User was created."));
}
else{
    http_response_code(201);
    echo json_encode(array("message" => "Unable to create user."));
}



