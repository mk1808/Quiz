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

    public function create(){
        $this->idSubject=strval(htmlspecialchars(strip_tags($this->idSubject)));
        //$this->idCategory=strval(htmlspecialchars(strip_tags($this->idCategory)));
        $this->text=htmlspecialchars(strip_tags($this->text));
        $this->code=htmlspecialchars(strip_tags($this->code));
        $this->image=htmlspecialchars(strip_tags($this->image));


        $query = 'INSERT INTO question SET
                ID_SUBJECT = '.$this->idSubject.',
                ID_CATEGORY = '.$this->idCategory.',
                TEXT = "'.$this->text.'",
                CODE = "'.$this->code.'",
                IMAGE = "'.$this->image.'";';
       /*$query = "INSERT INTO question (ID_SUBJECT, ID_CATEGORY, TEXT, CODE, IMAGE)
 VALUES ('$this->idSubject', '$this->idCategory', '$this->text', '$this->code','$this->image')";*/

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':idSubject', intval($this->idSubject));
        $stmt->bindParam(':idCategory', $this->idCategory);
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':code', $this->code);
        $stmt->bindParam(':image', $this->image);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

}