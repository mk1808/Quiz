<?php

/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 20.11.2018
 * Time: 23:11
 */
class user
{
    private $conn;
    private $tableName = "user";

    public $id;
    public $name;
    public $surname;
    public $email;
    public $password;
    public $role;
    public $created;
    public $modified;
	public $course;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->surname=htmlspecialchars(strip_tags($this->surname));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->role=htmlspecialchars(strip_tags($this->role));
        $this->course=htmlspecialchars(strip_tags($this->course));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

        if ($this->emailExists()){
            return false;
        }

        $query = 'INSERT INTO user SET 
                NAME = "'.$this->name.'",
                SURNAME = "'.$this->surname.'",
                EMAIL = "'.$this->email.'",
                PASSWORD = "'.$password_hash.'",
                COURSE = "'.$this->course.'",
                ROLE = "'.$this->role.'";';

        // prepare the query
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }

        return false;

    }
    function emailExists(){

        // query to check if email exists
        $query = "SELECT ID, NAME, SURNAME, PASSWORD, ROLE, COURSE
            FROM user
            WHERE EMAIL = ?
            LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare( $query );

        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['ID'];
            $this->name = $row['NAME'];
            $this->surname = $row['SURNAME'];
            $this->password = $row['PASSWORD'];
            $this->role = $row['ROLE'];
			$this->course = $row['COURSE'];
            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    // update a user record
    public function update(){

        // if password needs to be updated

        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->surname=htmlspecialchars(strip_tags($this->surname));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->role=htmlspecialchars(strip_tags($this->role));
        $password_hash = "";
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

            //$stmt->bindParam(':password', $password_hash);
        }
        $password_set=!empty($this->password) ? ', PASSWORD = "'.$password_hash : "";

        // if no posted password, do not update the password
        $query = 'UPDATE user SET
                NAME = "'.$this->name.'",
                SURNAME = "'.$this->surname.'",
                EMAIL = "'.$this->email.'",
                ROLE = "'.$this->role.'"'."
                {$password_set}".'"'."
            WHERE ID = ".$this->id.";";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }


    public function  getResultForQuestion($id_user, $id_question){
        $query = "SELECT * FROM user_result WHERE ID_USER = ".$id_user." AND ID_SUBJECT = ".$id_question;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value= $stmt->fetch(PDO::FETCH_ASSOC);


        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }

}