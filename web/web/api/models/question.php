<?php

include_once 'answer.php';

class Question{
    private $conn;
    private $tableName = "QUESTION";
    
    public $ID;
    public $idSubject;
    public $category;
    public $text;
    public $code;
    public $image;
    public $answers;
    
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
        $query = "SELECT STATUS FROM ANSWER WHERE ID = ".$answer->id;
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($answer->value != $row['STATUS']){
                $value = false;
                break;
            }
        }
        return intval($value);
    }

    public function create(){
        $this->idSubject=strval(htmlspecialchars(strip_tags($this->idSubject)));
        $this->category=strval(htmlspecialchars(strip_tags($this->category)));
        $this->text=htmlspecialchars(strip_tags($this->text));
        $this->code=htmlspecialchars(strip_tags($this->code));
        $this->image=htmlspecialchars(strip_tags($this->image));

        $query = 'INSERT INTO question SET
                ID_SUBJECT = '.$this->idSubject.',
                CATEGORY = "'.$this->category.'",
                TEXT = "'.$this->text.'",
                CODE = "'.$this->code.'",
                IMAGE = "'.$this->image.'";';

        $stmt = $this->conn->prepare($query);

//        http_response_code(200);
//        echo json_encode(array($stmt));

        if($stmt->execute()){

            $answer = new Answer($this->conn);
            if ($answer->createAnswer($this->answers, $this->conn->lastInsertId()))
             return 1;
             else {
                 return -2;
             }
        }

        return -1;
    }

    public function getQuestion($id){
        $query = "SELECT * FROM question WHERE ID = ".$id;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    public function getQuestionsForQuiz($id){
        $query = "SELECT * FROM question WHERE ID_SUBJECT = ".$id;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

}