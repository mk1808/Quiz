<?php
class Question{
    private $conn;
    private $tableName = "QUESTION";
    
    public $ID;
    public $idSubject;
    public $idCategory;
    public $text;
    public $code;
    public $image;
    
    public function __construct($db){
        $this->conn = $db;
    }
    
    public function getAnswers($id){
        //$query = "SELECT * FROM ".$this->tableName." WHERE ID = ".$id;
        $query = "SELECT * FROM ANSWER WHERE ID_QUESTION = ".$id;
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        return $stmt;
    }
    
    public function checkAnswer($answers){
        
        $value = true;
        foreach ($answers as $answer){
        $query = "SELECT * FROM ANSWER_STATUS WHERE ID = ".$answer->id;
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($answer->value != $row['IS_TRUE']){
                $value = false;
                break;
            }
        }
        return intval($value);
    }
    
}