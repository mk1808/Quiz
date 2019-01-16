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

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->course = htmlspecialchars(strip_tags($this->course));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

        if ($this->emailExists()) {
            return false;
        }

        $query = 'INSERT INTO ' . $this->tableName . ' SET 
                NAME = :name ,
                SURNAME = :surname ,
                EMAIL = :email ,
                PASSWORD = :password ,
                COURSE = :course ,
                ROLE = :role ;';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindParam(':surname', $this->surname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password_hash, PDO::PARAM_STR);
        $stmt->bindParam(':course', $this->course, PDO::PARAM_STR);
        $stmt->bindParam(':role', $this->role, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;

    }

    function emailExists()
    {
        $query = "SELECT ID, NAME, SURNAME, PASSWORD, ROLE, COURSE
            FROM " . $this->tableName . "
            WHERE EMAIL = ?
            LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['ID'];
            $this->name = $row['NAME'];
            $this->surname = $row['SURNAME'];
            $this->password = $row['PASSWORD'];
            $this->role = $row['ROLE'];
            $this->course = $row['COURSE'];

            return true;
        }
        return false;
    }

    public function update()
    {

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->course = htmlspecialchars(strip_tags($this->course));
        $password_hash = "";
        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        }
        $password_set = !empty($this->password) ? ', PASSWORD = "' . $password_hash . '"' : '';

        $query = 'UPDATE ' . $this->tableName . " SET
            NAME = :name ,
            SURNAME = :surname ,
            EMAIL = :email ,
            COURSE = :course ,
            ROLE = :role 
            " . $password_set . "
            WHERE ID = :id ;";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindParam(':surname', $this->surname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->bindParam(':course', $this->course, PDO::PARAM_STR);
        $stmt->bindParam(':role', $this->role, PDO::PARAM_STR);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }


    public function getResultForQuestion($id_user, $id_question)
    {
        $query = "SELECT * FROM user_result WHERE 
        ID_USER = :idUser
        AND ID_SUBJECT = :idSubject ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idUser', $id_user, PDO::PARAM_INT);
        $stmt->bindParam(':idSubject', $id_question, PDO::PARAM_INT);
        $stmt->execute();
        $value = $stmt->fetch(PDO::FETCH_ASSOC);
        return $value;
    }

}