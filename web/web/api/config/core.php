<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 23.11.2018
 * Time: 10:04
 */

// show error reporting
error_reporting(E_ALL);

// set your default time-zone
date_default_timezone_set('Europe/Warsaw');

// variables used for jwt
$key = "Axb65K4y";
$iss = "http://localhost";
$aud = "http://localhost";
$iat = 1356999524;
$nbf = 1357000000;