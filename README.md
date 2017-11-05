# Bamazon

A command prompt version of Amazon with the ability

## Tools used
* MySQL Server
* Node.js
* Inquirer.js (npm)
* mysql.js (npm)

## PseudoCode
## Functions
  1. Login
  2. List inventory available
  3. List purchases (by user logged on)
  4. Purchase Item
  5. Add to Inventory
## Logic
  1. Prompt customer if they have an account
    1. If no, then send them to CreateAccount
    2. If yes, move on
  2. Prompt for username and password
  3. Prompt for the following:
    1. List Inventory
        1. Select Item to purchase
        2. Exit to previous menu 
    2. List previous purchases
        1. Select Item to return
        2. Exit to previous menu
    3. If Employee, show the following:
        1. View Inventory
        2. Add to inventory
    
Video of app functioning:

![Demo](https://github.com/rcintron1/bamazon/blob/master/bamazon.gif?raw=true)
