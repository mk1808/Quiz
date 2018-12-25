<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 23.11.2018
 * Time: 10:51
 */

include_once '../../config/postConfig.php';

include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";

if($jwt){
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        http_response_code(200);
        echo json_encode(array(
            "message" => "Access granted.",
            "data" => $decoded->data
        ));
    }
    catch (Exception $e){
        http_response_code(201);
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}
else{
    http_response_code(201);
    echo json_encode(array("message" => "Access denied."));
}
