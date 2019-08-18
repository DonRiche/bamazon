var mysql = require("mysql");
var inquirer = require("inquirer");
//var databasePassword = require(".env");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Audrill@9",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    queryAllProducts();
});
console.log("----------------BAMAZON-------------------");

function queryAllProducts() {
    var productsQuery = "SELECT * FROM products";
    connection.query(productsQuery, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].items_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "|" + res[i].stock_quantity);
        }
        console.log("----------------BAMAZON-------------------");
        itemSearch();

    });
}

function itemSearch() {
    inquirer
        .prompt({
            name: "itemId",
            type: "input",
            message: "What is the ID of the product you would like to buy? \n",
            //message: "How many units of the product you would like to buy?"

        })
        .then(function (answer) {
            var itemQuery = "SELECT items_id,product_name,price FROM products WHERE ?";
            connection.query(itemQuery, { items_id: answer.itemId }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("----------------BAMAZON-------------------");

                    console.log("Buying:" + res[i].product_name + " at $" + res[i].price);
                }
                //runSearch();
            });
        });
}