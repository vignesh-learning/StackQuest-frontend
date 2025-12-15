<?php
$servername="localhost";
$username="root";
$password="";
$dbname="information";

$conn=new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("connection failed:".$conn->connect_error);
}
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['firstname'],$_POST['lastname'],$_POST['email'],$_POST['phonenumber'],$_POST['password'],$_POST['confirmpassword']))
{
    $firstname=$conn->real_escape_string(trim($_POST['firstname']));
    $lastname=$conn->real_escape_string(trim($_POST['lastname']));
    $email=$conn->real_escape_string(trim($_POST['email']));
    $phonenumber=$conn->real_escape_string(trim($_POST['phonenumber']));
    $password=$conn->real_escape_string(trim($_POST['password']));
    $confirmpassword=$conn->real_escape_string(trim($_POST['confirmpassword']));

    $sql="INSERT INTO deatils(firstname,lastname,email,phonenumber,password,confirmpassword) VALUES('$firstname','$lastname','$email','$phonenumber','$password','$confirmpassword')";

    if($conn->query($sql)===TRUE){
       header('Location:index2.html');
       exit;
    }else{
        echo "Error:".$sql."<br>".$conn->error;
    }
}
else{
    echo "Invalid Request";
}
$conn->close();
?>