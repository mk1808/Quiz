<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 25.12.2018
 * Time: 15:32
 */

include_once 'core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

function authorizate($jwt) {
    $jwt=isset($jwt) ? $jwt : "";

    $key = "Axb65K4y";
    if($jwt){
        try {
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            $arr = array("status"=> 1, "decoded" => $decoded->data);

            return $arr;
        }
        catch (Exception $e){
            return array("status"=>-1);
        }
    }
    else{
        return array("status"=>-2);
    }
}