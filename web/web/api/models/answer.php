<?php
class Answer{
    private $conn;
    private $tableName = "ANSWER";
    
    public $ID;
    public $idQuestion;
    public $text;
    public $status;
    
    public function __construct($db){
        $this->conn = $db;
    }
    
    public function checkAnswer($id){
        $query = "SELECT STATUS FROM ANSWER WHERE ID = ".$id;
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        $value = $stmt->fetch()[0];
        return intval($value);
    }
}