# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts
Headers :
- Authorization : token

Request Body :
```json
{
  "firstName": "Dzikri Nur",
  "lastName": "Akbar",
  "email": "dzikri@gmail.com",
  "phone": "235432758"
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "firstName": "Dzikri Nur",
    "lastName": "Akbar",
    "email": "dzikri@gmail.com",
    "phone": "235432758"
  }
}
```
Response Body Error :
```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization : token

Request Body :
```json
{
  "data": {
    "firstName": "Dzikri Nur",
    "lastName": "Akbar",
    "email": "dzikri@gmail.com",
    "phone": "235432758"
  }
}
```
Response Body Success :
```json
{
  "data": {
    "id": 1,
    "firstName": "Dzikri Nur",
    "lastName": "Akbar",
    "email": "dzikri@gmail.com",
    "phone": "235432758"
  }
}
```
Response Body Error :
```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "firstName": "Dzikri Nur",
    "lastName": "Akbar",
    "email": "dzikri@gmail.com",
    "phone": "235432758"
  }
}
```
Response Body Error :
```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query Params :
- name : search by firstName or lastName, using like, optional
- email : search by email using like, optional
- phone : search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :
```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Dzikri Nur",
      "lastName": "Akbar",
      "email": "dzikri@gmail.com",
      "phone": "235432758"
    },
    {
      "id": 2,
      "firstName": "Khalid Shalahuddin",
      "lastName": "Akbar",
      "email": "akbar-khalid@gmail.com",
      "phone": "235432723458"
    },
  ],
  "paging": 1,
  "totalPages": 3,
  "totalRecords": 30
}
```
Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :
```json
{
  "data": "OK"
}
```
Response Body Error :
```json
{
  "errors": "Contact is not found"
}
```
