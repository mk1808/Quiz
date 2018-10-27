<?php

class Subject{
    private $conn;
    private $tableName = "SUBJECT";
    
    public $ID;
    public $name;
    public $author;
    
    public function __construct($db){
        $this->conn = $db;
    }
       
    
    public function getQuestions(){
        //$query = "SELECT * FROM ".$this->tableName." WHERE ID = ".$id;
        $query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        return $stmt;
    }
    
    public function checkAnswers($questions){
        
        $question = new Question($this->conn);
        $questionsTotal = 0;
        $questionsTrue = 0;
        foreach ($questions as $answer){
            $questionsTotal +=1;
            if($question->checkAnswer($answer->answers)==1){
                $questionsTrue+=1;
            }
        }
        return array(
            'total' => $questionsTotal,
            'true' => $questionsTrue
        );
    }
    
}


