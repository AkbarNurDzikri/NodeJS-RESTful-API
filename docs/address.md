# Address API Specs

## Create address API
Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization

Request Body :
```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postCode": "Kode pos"
}
```

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postCode": "Kode pos"
  }
}
```

Response Body Error :
```json
{
  "errors": "Country is required"
}
```
## Update address API
Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization

Request Body :
```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postCode": "Kode pos"
}
```

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postCode": "Kode pos"
  }
}
```

Response Body Error :
```json
{
  "errors": "Country is required"
}
```
## Get address API
Endpoint : POST /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization

Response Body Success :
```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postCode": "Kode pos"
  }
}
```

Response Body Error :
```json
{
  "errors": "Contact is not found"
}
```
## List addresses API
Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization

Response Body Success :
```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postCode": "Kode pos"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postCode": "Kode pos"
    },
  ]
}
```

Response Body Error :
```json
{
  "errors": "Contact is not found"
}
```
## Remove address API
Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization

Response Body Success :
```json
{
  "data": "OK"
}
```

Response Body Error :
```json
{
  "errors": "Address is not found"
}
```