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
    
    public function checkAnswer($id){
        $query = "SELECT IS_TRUE FROM ANSWER_STATUS WHERE ID = ".$id;
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        $value = $stmt->fetch()[0];
        return intval($value);
    }
}