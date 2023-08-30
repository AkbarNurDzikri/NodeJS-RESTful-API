# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
  "username": "pzn",
  "password": "rahasia",
  "name": "Dzikri Nur Akbar"
}
```

Response Body Success :
```json
{
  "data": {
    "username": "pzn",
    "name": "Dzikri Nur Akbar"
  }
}
```

Response Body Error :
```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "pzn",
  "password": "rahasia"
}
```

Response Body Success :
```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :
```json
{
  "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Request Body :
```json
{
  "name": "Dzikri Nur Akbar", // optional
  "password": "new password" // optional
}
```

Response Body Success :
```json
{
  "data": {
    "username": "pzn",
    "name": "Dzikri Nur Akbar"
  }
}
```

Response Body Error :
```json
{
  "errors": "Max length 100 characters"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization: token

Response Body Success :
```json
{
  "data": {
    "username": "pzn",
    "name": "Dzikri Nur Akbar"
  }
}
```

Response Body Error :
```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization: token

Response Body Success :
```json
{
  "data": "OK"
}
```

Response Body Error :
```json
{
  "errors": "Unauthorized"
}
```
