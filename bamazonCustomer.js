var mysql = require('mysql');
var inquirer = require('inquirer');

// Connection with mySQL DATABASE
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Audrill@9",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection is successful!");


    showTable();
})

// Function that gets information from db
var showTable = function () {


    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].items_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n")
        }


        askUser(res);
    })
}


var askUser = function (res) {


    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to buy? (to exit press Q)"


    }]).then(function (answer) {

        var correct = false;


        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
        }

        for (var i = 0; i < res.length; i++) {


            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;


                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    //Update the database
                }).then(function (answer) {
                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stock_quantity=' " + (res[id].stock_quantity - answer.quantity) + " ' WHERE product_name='" + product + "'", function (err, res2) {
                            console.log("Prouduct is Purchased!");
                            showTable();
                        })

                    } else {
                        console.log("Insufficient quantity!");
                        promptUser(res);
                    }
                })
            }
        }

        // If wrong value
        if (i == res.length && correct == false) {
            console.log("Not a valid selection!");
            promptUser(res);
        }
    })
}