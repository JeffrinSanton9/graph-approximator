# GRAPH APPROXIMATOR
Author : Jeffrin Santon T

## PROJECT OVERVIEW

A full stack application to approximate discrete data points to a function as a string<br>

## Database Design
### User
1. TABLE users (<br>
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,<br>
    username TEXT UNIQUE NOT NULL,<br>
    email TEXT UNIQUE NOT NULL<br>
)<br>


#### Description
Users table contains user id, name, email which is used to store the users data to identify a single user among users.<br>

### Session
2.TABLE Sessions(<br>
        session_id INTEGER PRIMARY KEY AUTOINCREMENT,<br>
           user_id INTEGER NOT NULL,<br>
            session_name TEXT NOT NULL,<br>
            description TEXT,<br>
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,<br>
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,<br>
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE<br>
)<br>


#### Description
Sessions table contain session details such as session id, name, user id, description, created and updated time stamp<br>
The user id is a foreign key to map with the user table<br>

### Datapoints
3.TABLE data_points(<br>
point_id INTEGER PRIMARY KEY AUTOINCREMENT,<br>
            session_id INTEGER NOT NULL,<br>
    x_value REAL NOT NULL,<br>
    y_value REAL NOT NULL,<br>
    FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE<br>
)<br>


#### Description
Data points table contains all the data points created by multiple users and they are mapped to the session table using session id foreign key<br>
It stores data points as x value and y value<br>


## Backend Design API end points

### User Endpoints

`POST` /user - Create new user<br>
`PUT` /user/{id} - Update user information<br>
`DELETE` /user/{id} - Delete user<br>
`GET` user/{id} - Get user information<br>


### Session Endpoints

`POST` /session - Create new session<br>
`PUT` /session - Update session information<br>
`DELETE` /session/{id} - Delete session<br>
`GET` /session/{id} - Get user information<br>
`GET` /session/{user_id} - Get all the sessions belongs to a particular user<br>


### Datapoint Endpoints

`POST` /datapoint - Create new datapoints<br>
`PUT` /datapoint - Update datapoint<br>
`DELETE` /datapoint/{id} - Delete datapoint<br>
`GET` /datapoint/{id} - Get datapoint information<br>
`GET` /datapoint/{session_id} - Get all datapoints belongs to a particular session<br>

### Approximator Endpoints:

`POST` /approximate/series/{session_id} - Get approximated function using taylor series<br>
`POST` /approximate/polynomial/{session_id} - Get approximated function using polynomial regression <br>
`POST` /approximate/linear/{session_id} - Get approximated function using linear regression<br>

## Core:

### Approximation:
    -Taylor Series
    -Polynomial Regression
    -Linear Regression

## Frontend Design:
    (to be filled)
### Core:
    Plotter - which will plot the function for the users to analyze.<br>
     
    

### Routes:

home        "/" -> information about the website, navigation and what it is used for and all such information. <br><br>



user_login  "/user" -> login page for users<br>
user        "/user/{user_id}" -> user page with session list where user can select any session<br><br>

session     "/session/{user_id}" -> session page where user can add points, approximate etc.,<br>
            




