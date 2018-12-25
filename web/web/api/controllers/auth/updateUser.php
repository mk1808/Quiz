<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 23.11.2018
 * Time: 10:57
 */

include_once '../../config/postConfig.php';

include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

include_once '../../models/user.php';

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
$jwt = isset($data->jwt) ? $data->jwt : "";

if ($jwt) {

    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        $user->name = $data->name;
        $user->surname = $data->surname;
        $user->email = $data->email;
        $user->password = $data->password;
        $user->role = $data->role;
        $user->id = $decoded->data->id;
        if ($user->update()) {
            $token = array(
                "iss" => $iss,
                "aud" => $aud,
                "iat" => $iat,
                "nbf" => $nbf,
                "data" => array(
                    "id" => $user->id,
                    "name" => $user->name,
                    "surname" => $user->surname,
                    "email" => $user->email,
                    "role" => $user->role
                )
            );
            $jwt = JWT::encode($token, $key);
            http_response_code(200);

            echo json_encode(
                array(
                    "message" => "User was updated.",
                    "jwt" => $jwt
                )
            );
        } else {
            http_response_code(201);
            echo json_encode(array("message" => "Unable to update user."));
        }
    } catch (Exception $e) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
} else {
    http_response_code(201);
    echo json_encode(array("message" => "Access denied."));
}
