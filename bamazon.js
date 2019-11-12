var mysql = require('mysql');
var inquirer = require('inquirer');

// Create connection for mysql
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Any!98105',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection success! id " + connection.threadId);
    displayAllItems();
});

// Display Product ID, Product Name, Price from bamazon.products
function displayAllItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("+----------Product List----------+");
        for (var i = 0; i < res.length; i++) {
            console.log(
                "\n" +
                "Product ID: " + res[i].item_id +
                "\nProduct Name: " + res[i].product_name +
                "\nPrice: " + res[i].price
            );
        }
        // console.log(res);
        // connection.end();
        promptPurchaseQuestions();
    });
};

// Prompt to ask what product id and quantity user wants to purchase
function promptPurchaseQuestions() {
    inquirer.prompt([{
            name: "select_item",
            type: "input",
            message: "Input the Product ID you would like to purchase."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many you would like to purchase?"
        }
    ]).then(function (answer) {
        // console.log(answer.select_item);
        // console.log(answer.quantity);
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [answer.select_item], function qtyCheckAndUpdate(err, res) {
            if (err) throw err;
            // console.log(res);
            if (res[0].stock_quantity < answer.quantity) {
                console.log(
                    "Sorry, insufficient quantity of " + res[0].product_name + " !" +
                    "\nStock quantity: " + res[0].stock_quantity);
            } else {
                var purchaseQuantity = answer.quantity;
                var newStock = res[0].stock_quantity - answer.quantity;
                var id = answer.select_item;
                var itemName = res[0].product_name;
                updateStockQty(newStock, id, itemName, purchaseQuantity);
            }

        });
    })
};

function updateStockQty(newQty, selectID, productName, purchaseQuantity) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newQty
            },
            {
                item_id: selectID
            }
        ],
        function (error) {
            if (error) throw error;
            console.log("Successfully purchased " + purchaseQuantity + " " + productName + " !");
            console.log("Current " + productName + " quantity: " + newQty);
            // console.log("Product: " + productName)
            promptPurchaseQuestions();
        }
    );

};