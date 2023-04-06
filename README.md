<p align="center">
  <a href="" rel="noopener">
 <img src="./logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Giga Pets</h3>

<div align="center">

[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/rawda-dev/giga-pets/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
Giga Pets is a pet appointment system that allows user to perform the CRUD operations on pets appointments 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)

- [Authors](#authors)

## 🧐 About <a name = "about"></a>
![](./giga%20pets%20-%20login.png)
![](./giga%20pets%20-%20profile.png)
![](./giga%20pets%20-%20my%20appointments.png)
This project has the following features:

- User Registeration
- User Login and Logout
- User update and Delete
- Appointments CRUD operations
- Appointment real time search

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

```
node -v
npm -v
```

### Installing

1. Clone the project

```
git clone https://github.com/rawda-dev/giga-pets

```

```
cd giga-pets
```

2. Run the Backend

```
sudo mongod --port 27017
```

- Open a new terminal

```
cd backend
npm i
npm run dev
```

3. Run the frontend

- Open a new terminal

```
cd frontend
npm i
npm start
```

## 🔧 Running the tests <a name = "tests"></a>
Please make sure to close the development database and start the test database
```
sudo mongod --port 27018
```
```
cd backend
npm test
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@RawdaDev](https://github.com/rawda-dev/) - Idea & Initial work
