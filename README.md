# fullstack-webshop-backend available on [heroku](https://ashmademoiselle-8623d0938879.herokuapp.com/)

### Under construction ...

###### Endpoints for index
|Endpoint   |Method   |Bearer Token?   |Admin Token?   |Description   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|/products   |GET   |No   |No   |Routes for retrieving product information   |
|/cart   |GET   |No   |No   |Routes for viewing and modifying the user's shopping cart   |
|/login   |GET   |No   |No   |Route for admin login and authentication   |
|/register   |GET   |No   |No   |Routes for admin registration   |

###### Endpoints for products 

|Endpoint   |Method   |Bearer Token?   |Admin Token?   |Request   |Response   |Model   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|/product   |GET   |No   |No   |Get all products   |Array of products or error message   |product model   |
|/product/:productId   |GET   |No   |No   |Get a single product   |product details or error message   |product model   |
|//products/add-product   |POST   |No   |YES   |Add a product   |product successfully created or error message   |product model   |
|/product/:productId   |DELETE   |No   |YES   |Delete single product   |A success message if the product is successfully deleted or an error message   |product model   |
|/product/:productId   |PUT   |No   |YES   |Udate product   |Updated product or error message   |product model   |

###### Endpoints for cart 

|Endpoint   |Method   |Bearer Token?   |Admin Token?   |Request   |Response   |Model   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|/cart/order   |POST   |No   |No   |An object containing: { productId, quantity, chest, waist, hips }   |A success message if the item is successfully added to the cart or an error message in case of failure   |No   |
|/cart   |GET   |No   |No   |   |An array of cart items retrieved for the user or an error message in case of failure    |No   |
|/cart/order/checkout   |POST   |No   |No   |An object containing: {status, firstname, lastname, email, address, bankDetails}   |A success message if the order is successfully placed or an error message in case of failure.   |Order  |

###### Endpoints for register 

|Endpoint   |Method   |Bearer Token?   |Admin Token?   |Request   |Response   |Controller   |Model   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
|/employee   |POST   |YES   |YES   |employee data including name, email, password   |successful registration message or error   |registeruser   |user   |
|/admin   |POST   |YES   |YES   |admin data including name, email, password   |successful registration message or error   |registeruser   |user   |

###### Endpoints for login 

|Endpoint   |Method   |Bearer Token?   |Admin Token?   |Request   |Response   |Controller   |Model   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
|/employee   |POST   |YES   |YES   |employee data including email, password   |successful login message, User ID and Access Token or error message   |loginUser   |user   |
|/admin   |POST   |YES   |YES   |admin data including name, email, password   |successful login message, User ID and Access Token or error message   |loginUser   |user   |


