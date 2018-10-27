<?php
class AnswerStatus{
    private $conn;
    private $tableName = "ANSWER_STATUS";
    
    public $ID;
    public $idQuestion;
    public $isTrue;
    
    public function __construct($db){
        $this->conn = $db;
    }
}