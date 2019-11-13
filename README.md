# bamazon
Cli application that simulates the online shopping store. 

> Using Node.js + mysql module to interact with database and inquirer module to display prompt for users.
> Prompt shown using inquirer module, type as "input", getting the user answer for selected product ID and purchase quantity. User answers are then handled in the .then function, which is later on used to query database for product stock quantity, product name, see if the quantity is sufficient and update stock quantity in the database.

## Display Items
* When running the application, it will check for connection to database.
If success, you will see the message 
 `connection success! id + threadID`

* It will then display all the products on bamazon and how much each item costs.
![display](https://user-images.githubusercontent.com/52692899/68732819-a24f8400-0589-11ea-99e7-c150ce1d62ec.gif)

 * The app then prompts question asking user which item they would like to purchase and how many they want to purchase.
 

## Insufficient Quantity

If the user wants the purchase the quantity that is greater than the stock quantity, it will notice the user with
`Sorry, insufficient quantity of product_name !` also showing the current stock quantity of the product.

Then again prompts the user to pick a product and quantity they would like to purchase.

![insufficient](https://user-images.githubusercontent.com/52692899/68733288-f7d86080-058a-11ea-96d1-aba17f96bb9d.gif)

## Purchased Successfully

If the stock quantity is sufficient for the user to purchase, then it will notice the user `Successfully purchased purchase_quantity + product_name !` follow by the updated stock quantity.

![success purchase](https://user-images.githubusercontent.com/52692899/68733104-85678080-058a-11ea-879e-cc0ee4f3b19c.gif)

The prompt will keep showing until exit from app.


