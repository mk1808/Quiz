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

    public function createAnswer($answers, $id)
    {

        $query = 'INSERT INTO answer (ID_QUESTION, STATUS, TEXT) VALUES';

        foreach($answers as $answer){

        $answer->text = strval(htmlspecialchars(strip_tags($answer->text)));
        $answer->status = strval(htmlspecialchars(strip_tags($answer->status)));
        if($answer->status==""){
            $answer->status=0;
        }
        $query=$query.' ('.$id. ','.($answer->status).',"'.($answer->text).'"),';
        }
        $query = substr($query,0, strlen($query)-1);

        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }

        return false;
    }
}