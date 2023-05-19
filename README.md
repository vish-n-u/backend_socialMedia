# Backend FoodVilla App
This project is node.js back-end code for a FoodVilla application built using Express and MongoDB .POSTMAN is used for
Integration testing using REST API's.

<br/>

## Features

>**Account creation**
- You can create an account either using Email or you can sign-in using Google.
- You can login  using Google or using Email and Password or, in case if you forgot password you can login using otp.  

>**Order creation**
- Only authenticated users can create an order.
- Orders can get cancelled due to system error or delivery partner's accident.
- A jwt and refresh token are provided during sign-in,jwt is automatically recreated if it expires, if refresh token expires user is logged out!


### Data safety
- All data of the users are deleted from the database every Sunday.
- If Logged in using google sign-in , only email-id and username are stored.
- If you still dont want to sign-in using your details,  you can login using  **username:-defaultUser and password:-defaultPassword**

<br/>

## Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|dotenv|
|body-parser|
|bcryptjs|
|cors|
|google-auth-library|

<br/>

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
  ```shell
git clone https://github.com/vish-n-u/backend_socialMedia
```

2. Change into the project directory:
```shell
cd backend_socialMedia
```

3. Install the dependencies:
```shell
npm install
```

4 .Start the development server:
```shell
npm run start
```

 5.Open your browser and visit http://localhost:1234 to see the app running.
 </br>
 

