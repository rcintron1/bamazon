// Initializing variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

// Account Creation

function newAccount(){
    inquirer.prompt(
       [ {  name: "userId",
            message:"Please select a UserID",
            type: "input"},
        {   name: "firstName",
            message: "Enter First Name",
            type: "input"},
        {   name: "lastName",
            message: "Enter Last Name",
            type: "input"}
        ]
    ).then(function(answer){
        console.log(answer);
        connection.query()
    }

    );
}

// login
function login(){

}


// list inventory available
function listInventory(){

}

// list purchases made
function listPurchases(){

}

// purchase item
function purchaseItem(){

}

//****Management Menu****
// management report


// Application starting point
inquirer.prompt(
    {   name: "exist",
        message: "Do you have an account?",
        type: "confirm"}
).then(function (answer){
    console.log(answer);
    connection.connect(function(err){
        if (err) throw err;
    });
    if(answer.exist === false){
        newAccount();
    }else{
        login();

    }
});