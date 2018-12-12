<?php

class Subject{
    private $conn;
    private $tableName = "SUBJECT";
    
    public $id;
    public $name;
    public $id_author;
    public $nOQuestions;
    public $multipleChoice;
    public $separatePage;
    public $canBack;
    public $limitedTime;
    public $time;
    public $course;
    public $description;



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
        $query = "SELECT * FROM question WHERE ID_SUBJECT = ".$id;
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
        $this->id_author=htmlspecialchars(strip_tags($this->id_author));
        $this->nOQuestions=htmlspecialchars(strip_tags($this->nOQuestions));
        $this->multipleChoice=htmlspecialchars(strip_tags($this->multipleChoice));
        $this->separatePage=htmlspecialchars(strip_tags($this->separatePage));
        $this->canBack=htmlspecialchars(strip_tags($this->canBack));
        $this->limitedTime=htmlspecialchars(strip_tags($this->limitedTime));
        $this->time=htmlspecialchars(strip_tags($this->time));
        $this->course=htmlspecialchars(strip_tags($this->course));
        $this->description=htmlspecialchars(strip_tags($this->description));


        $query = 'INSERT INTO subject SET 
                NAME = "'.$this->name.'",
                ID_AUTHOR = "'.$this->id_author.'",
                N_O_QUESTIONS = "'.$this->nOQuestions.'",
                MULTIPLE_CHOICE = "'.$this->multipleChoice.'",
                SEPARATE_PAGE = "'.$this->separatePage.'",
                CAN_BACK = "'.$this->canBack.'",
                LIMITED_TIME = "'.$this->limitedTime.'",
                TIME = "'.$this->time.'",
                COURSE = "'.$this->course.'",
                DESCRIPTION = "'.$this->description.'";';

        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }
        return -1;

    }

    public function getSubjectListForAuthor($id){
        $query = "SELECT * FROM ".$this->tableName." WHERE ID_AUTHOR = ".$id;
        //$query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value = array();
        for($i = 0; $i < $stmt->rowCount(); $i++){
            $value[$i]= $stmt->fetch(PDO::FETCH_ASSOC);
        }

        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }

    public function getSubjectDetail($id){
        $query = "SELECT * FROM ".$this->tableName." WHERE ID = ".$id;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

            $value= $stmt->fetch(PDO::FETCH_ASSOC);


        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }

    public function getSubjectListForCourse($course){
        $query = "SELECT * FROM ".$this->tableName.' WHERE COURSE = "'.$course.'"';
        //$query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value = array();
        for($i = 0; $i < $stmt->rowCount(); $i++){
            $value[$i]= $stmt->fetch(PDO::FETCH_ASSOC);
        }

        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }
}


