#  Merchant-user-group
**URL** : admin/permissions/merchant/user/groups
**Method** : `Post`
**Body**: 
```json
{
    "name":"test1",
    "displayName":"merchant_1",
    "description":"description merchant 1"
}
```
##  Success Response
**Code** : `200 OK`
**Content example**
```json
{
    "code": "00",
    "data": {
        "id": 1,
        "name": "test1",
        "displayName": "merchant_1",
        "description": "description merchant 1",
        "roles": []
    }
}
```