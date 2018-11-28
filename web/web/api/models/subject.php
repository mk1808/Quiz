<?php

class Subject{
    private $conn;
    private $tableName = "SUBJECT";
    
    public $id;
    public $name;
    public $author;
    public $nOQuestions;
    public $multipleChoice;
    public $separatePage;
    public $canBack;
    public $limitedTime;
    public $forQuestion;
    public $time;
    public $forUnregister;

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

    public function getSubectsQuestions($id){
        $query = "SELECT * FROM ".$this->tableName." WHERE ID = ".$id;
        //$query = "SELECT * FROM QUESTION";
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
            if(count($answer->answers)!= 0&&$question->checkAnswer($answer->answers)==1){
                $questionsTrue+=1;
            }
        }
        return array(
            'total' => $questionsTotal,
            'true' => $questionsTrue
        );
    }

    public function create(){
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->author=htmlspecialchars(strip_tags($this->author));
        $this->nOQuestions=htmlspecialchars(strip_tags($this->nOQuestions));
        $this->multipleChoice=htmlspecialchars(strip_tags($this->multipleChoice));
        $this->separatePage=htmlspecialchars(strip_tags($this->separatePage));
        $this->canBack=htmlspecialchars(strip_tags($this->canBack));
        $this->limitedTime=htmlspecialchars(strip_tags($this->limitedTime));
        $this->forQuestion=htmlspecialchars(strip_tags($this->forQuestion));
        $this->time=htmlspecialchars(strip_tags($this->time));
        $this->forUnregister=htmlspecialchars(strip_tags($this->forUnregister));


        $query = 'INSERT INTO subject SET 
                NAME = "'.$this->name.'",
                ID_AUTHOR = "'.$this->author.'",
                N_O_QUESTIONS = "'.$this->nOQuestions.'",
                MULTIPLE_CHOICE = "'.$this->multipleChoice.'",
                SEPARATE_PAGE = "'.$this->separatePage.'",
                CAN_BACK = "'.$this->canBack.'",
                LIMITED_TIME = "'.$this->limitedTime.'",
                FOR_QUESTION = "'.$this->forQuestion.'",
                TIME = "'.$this->time.'",
                FOR_UNREGISTER = "'.$this->forUnregister.'";';

        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }

        return false;

    }
}


