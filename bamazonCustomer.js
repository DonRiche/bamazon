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

