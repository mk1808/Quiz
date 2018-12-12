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
        $answers .foreach ($answers as $answer){

        $answer.text = strval(htmlspecialchars(strip_tags($answer.text)));
        $answer.status = strval(htmlspecialchars(strip_tags($answer.status)));


        $query = 'INSERT INTO answer (ID_QUESTION, STATUS, TEXT) VALUES(

) 
                ID_SUBJECT = ' . $this->idSubject . ',
                ID_CATEGORY = ' . $this->idCategory . ',
                TEXT = "' . $this->text . '",
                CODE = "' . $this->code . '",
                IMAGE = "' . $this->image . '";';
        /*$query = "INSERT INTO question (ID_SUBJECT, ID_CATEGORY, TEXT, CODE, IMAGE)
  VALUES ('$this->idSubject', '$this->idCategory', '$this->text', '$this->code','$this->image')";*/
}
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':idSubject', intval($this->idSubject));
        $stmt->bindParam(':idCategory', $this->idCategory);
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':code', $this->code);
        $stmt->bindParam(':image', $this->image);

        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }

        return false;
    }
}