// Initializing variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
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
            type: "input"},
        {   name: "password",
            message: "Enter a Password",
            type: "password"}
        ]
    ).then(function(answer){
        console.log(answer);
        connection.query(
            "INSERT INTO users SET ?", {
                first_name: answer.firstName,
                last_name: answer.lastName,
                username: answer.userId,
                password: answer.password
              },
              function (err, res) {
                if (err){
                    console.log(err.message);
                } 
                console.log(res);
                console.log("Your account has been created " + answer.firstName + " " + answer.lastName);
                // re-prompt the user for if they want to bid or post
                login();
              }
        );
    }

    );
}

// login
function login(){
    inquirer.prompt(
        [{
            name:"username",
            type:"input",
            message:"Please enter your username"
        },{
            name:"password",
            type:"password",
            message:"Please enter your password"
        }]
    ).then(function(answer){
        connection.query(
            "SELECT userid FROM users Where username = ? AND password = ?", [
              answer.username,
              answer.password
            ],
            function (err, data) {
              if (err) throw err;
              if (data !== undefined) {
                console.log('Welcome ' + answer.username);
                main();
              } else {
                console.log('Bad Username or password, please try again later');
              }
            }
          );

        }
    );
}
// main menu
function main(){
    inquirer.prompt(
       {    name:"task",
            message:"Select a task",
            type:"list",
            choices:
                ["List Items on Sale",
                "listPurchases"]
            }
    ).then(function(answer){
        console.log(answer)
    });
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

// management add to inventory
function addToInventory(values){
    connection.query(
        "INSERT INTO products SET ?", {
          product_name: values.product_name,
          department_name: values.department_name,
          price: values.price,
          stocke_quantity: values.quantity
        },
        function (err) {
          if (err) throw err;
          console.log(values.quantity + " " + values.product_name + " have been added to inventory");
          // re-prompt the user for if they want to bid or post
          main();
        });
}


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
