# node-redis-API
CRUD RESTFUL API using Node JS, Express JS, and Redis.


## API Features
```
1. Create User
2. Get all Users
3. Get Each User by ID
4. Delete User
5. Update User
```

## Getting Started

  1. `git clone https://github.com/akinmaurice/node-redis-api.git`
  2. `cd node-redis-api`
  3. `npm install`
  4.  set up env variables: redis Host, redis Port, Server Port, Node env
  5. `npm start`

The above will get you a copy of the project up and running on your local machine for development and testing purposes.

## Dependencies
```
  1. REDIS
  2. NodeJS
  3. ExpressJS
```

## API Endpoints

All API endpoints return a status code of 200 for successful calls and 400 for
unsuccessful calls.

```
| EndPoint                                |   Functionality                      |
| --------------------------------------- | ------------------------------------:|
| POST /user/new                          | Create User                          |
| GET /user/:userId                       | Get User                             |
| GET /users/                             | Get all Users                        |
| PUT /user/:userId                       | Update User                          |
| DELETE /user/:userId                    | Delete User                          |
```

## Create user Example

To Create a user, Provide the Email, name and age of the user:
```
{
"email": "sample@gmail.com",
"name": "John Doe",
"age": 26
}
```
## Create User Example Response
```
{
    "status": "OK",
    "message": "User Created",
    "newUser": {
        "email": "sample@gmail.com",
        "name": "John Doe",
        "age": 26,
        "id": "acb479080840025a9c03f8453f5c853c"
    }
}
```


The API responds with JSON data by default.


