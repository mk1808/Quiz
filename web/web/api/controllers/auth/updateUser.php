<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 23.11.2018
 * Time: 10:57
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../../config/database.php';
include_once '../../models/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object

$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if($jwt){

    // if decode succeed, show user details
    try {
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            // set user property values
            $user->name = $data->name;
            $user->surname = $data->surname;
            $user->email = $data->email;
            $user->password = $data->password;
            $user->role = $data->role;
            $user->id = $decoded->data->id;

    // create the product
            if($user->update()){
                // we need to re-generate jwt because user details might be different
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

    // set response code
                http_response_code(200);

    // response in json format
                echo json_encode(
                    array(
                        "message" => "User was updated.",
                        "jwt" => $jwt
                    )
                );
            }

    // message if unable to update user
            else{
                // set response code
                http_response_code(401);

                // show error message
                echo json_encode(array("message" => "Unable to update user."));
            }

        }

            // if decode fails, it means jwt is invalid
        catch (Exception $e){

            // set response code
            http_response_code(401);

            // show error message
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage()
            ));
        }



}

// show error message if jwt is empty
else{

    // set response code
    http_response_code(401);

    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}









