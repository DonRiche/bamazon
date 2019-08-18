var mysql = require("mysql");
var inquirer = require("inquirer");
//var databasePassword = require(".env");
var productsQuery = "SELECT * FROM products";

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    queryAllProducts();
    //runSearch();
});

function queryAllProducts() {
    connection.query(productsQuery, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].items_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "|" + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}