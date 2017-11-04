// Initializing variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var gUser = {
    id: '',
    employee: false
};
var newline = '\n***********************\n';
//queryies
var queryUpdateStock = "UPDATE products SET stock_quantity = stock_quantity -1 WHERE item_id = ?";
var queryUpdatePurHist = "INSERT INTO purchase_history SET ?";
var querySelectUser = "SELECT userid, employee FROM users Where username = ? AND password = ?";
var queryListPurch = "SELECT purchase_history.trans_date, products.product_name, products.price FROM purchase_history INNER JOIN products ON products.item_id=purchase_history.item_id WHERE purchase_history.userid = ?"
var queryInvCust = "SELECT item_id, product_name, stock_quantity, price FROM products";
var queryInvMaster = "SELECT item_id, product_name, department_name, stock_quantity, price FROM products";


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Account Creation

function newAccount() {
    inquirer.prompt(
        [{
                name: "userId",
                message: "Please select a UserID",
                type: "input"
            },
            {
                name: "firstName",
                message: "Enter First Name",
                type: "input"
            },
            {
                name: "lastName",
                message: "Enter Last Name",
                type: "input"
            },
            {
                name: "password",
                message: "Enter a Password",
                type: "password"
            },
            {
                name: "employee",
                message: "Are you an employee",
                type: "confirm"
            }
        ]
    ).then(function (answer) {
        connection.query(
            "INSERT INTO users SET ?", {
                first_name: answer.firstName,
                last_name: answer.lastName,
                username: answer.userId,
                password: answer.password,
                employee: answer.employee
            },
            function (err, res) {
                if (err) {
                    console.log(err.message);
                }
                console.log("Your account has been created " + answer.firstName + " " + answer.lastName + "\n");
                // re-prompt the user for if they want to bid or post
                login();
            }
        );
    });
}

// login
function login() {
    inquirer.prompt(
        [{
            name: "username",
            type: "input",
            message: "Please enter your username"
        }, {
            name: "password",
            type: "password",
            message: "Please enter your password"
        }]
    ).then(function (answer) {
        connection.query(querySelectUser, [
                answer.username,
                answer.password,
            ],
            function (err, data) {
                if (err) throw err;
                if (data.length === 1) {
                    gUser.id = data[0].userid;
                    gUser.employee = data[0].employee;
                    console.log(newline + 'Welcome ' + answer.username + newline);
                    main();
                } else {
                    console.log('Bad Username or password, please try again later');
                }
            }
        );

    });
}

// main menu
function main() {
    var objPrompt = '';
    if (gUser.employee) {
        objPrompt = {
            name: "task",
            message: "Select a task",
            type: "list",
            choices: [
                "List Items on Sale",
                "List Purchases",
                "List Inventory",
                "Add to Inventory",
                "Exit"
            ]
        };
    } else {
        objPrompt = {
            name: "task",
            message: "Select a task",
            type: "list",
            choices: [
                "List Items on Sale",
                "List Purchases",
                "Exit"
            ]
        };
    }
    inquirer.prompt(objPrompt).then(function (answer) {
        switch (answer.task) {
            case "List Items on Sale":
                listInventory(queryInvCust, true);
                break;
            case "List Purchases":
                listPurchases();
                break;
            case "List Inventory":
                listInventory(queryInvMaster, false);
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Exit":
                process.exit(-1);

        }
    });
}

// list inventory available
function listInventory(query, askQ) {

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(newline);
        for (var i = 0; i < res.length; i++) {
            if (askQ) {
                console.log(res[i].item_id + " - " + res[i].product_name + " - $" + res[i].price.toFixed(2) + "- Quantity Left -" + res[i].stock_quantity);
            } else {
                console.log(res[i].item_id + " - " + res[i].product_name + " - $" + res[i].price.toFixed(2) + "- Deparment -" + res[i].department_name + "- Quantity Left -" + res[i].stock_quantity);
            }
        }
        console.log(newline);
        if (askQ) { // This is to request the question to purchase
            inquirer.prompt({
                name: "prompt",
                message: "If you would like to purchase an item, please select a number, otherwise just hit enter",
                type: "input"
            }).then(function (answer) {
                if (answer.prompt !== '') {
                    purchaseItem(answer.prompt);
                } else {
                    main();
                }
            });
        }else{
            main();
        }
    });
}

// list purchases made
function listPurchases() {
    connection.query(queryListPurch, [
            gUser.id
        ],
        function (err, data) {
            console.log(newline);
            for (var i = 0; i < data.length; i++) {
                var strDate = String(data[i].trans_date).split("T")[0];
                console.log(strDate, data[i].product_name, data[i].price);
            }
            console.log(newline);
            main();
        }
    );
}

// purchase item
function purchaseItem(item) {
    console.log("Item selected", item);
    inquirer.prompt({
        name: "purchase",
        type: "confirm",
        message: "Are you sure you want to purchase item #" + item
    }).then(function (answer) {
        if (answer.purchase) {
            console.log("Transaction in process...");
            connection.query(
                queryUpdateStock, [parseInt(item)],
                function (err, res) {
                    if (err) throw err;
                    console.log("\n**************\nItem Purchased\n**************\n\n");
                }
            );
            connection.query(queryUpdatePurHist, {
                userid: gUser.id,
                item_id: item
            }, function (err, res) {
                if (err) throw err;
                main();
            });

        } else {
            console.log("You did not purchase the product");
            main();
        }
    })
}

//****Management Menu****
// management report

// management add to inventory
function addToInventory(values) {
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
inquirer.prompt({
    name: "exist",
    message: "Do you have an account?",
    type: "confirm"
}).then(function (answer) {
    connection.connect(function (err) {
        if (err) throw err;
    });
    if (answer.exist === false) {
        newAccount();
    } else {
        login();
    }
});