<?php
    
    // include database connection
    include 'config/database.php';
    
    $query = "SELECT id, name, description, price FROM products ORDER BY id DESC";
    $stmt = $con->prepare($query);
    $stmt->execute();
    
    // this is how to get number of rows returned
    $num = $stmt->rowCount();
    
    // link to create record form
    echo "<a href='create.php' class='btn btn-primary m-b-1em'>Create New Product</a>";
    
    //check if more than 0 record found
    if($num>0){
        
        // data from database will be here
        
    }
    
    // if no records found
    else{
        echo "<div class='alert alert-danger'>No records found.</div>";
    }
?>