<?php
class Answer{
    private $conn;
    private $tableName = "ANSWER";
    
    public $ID;
    public $idQuestion;
    public $text;
    
    public function __construct($db){
        $this->conn = $db;
    }
}