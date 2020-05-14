# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /performance/data |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| festivalId        | 10 digit number | 1100000002 |
| startTime       | 4 Characters | 0900 |
| endTime       | 4 Characters | 1300 |

### Response Body

```json
{
    "result": [
        {
            "id": 4,
            "performance_id": 1000000004,
            "festival_id": 1100000002,
            "performance": "Performance 4",
            "starttime": "1000",
            "endtime": "1100",
            "popularity": 1
        },
        {
            "id": 5,
            "performance_id": 1000000005,
            "festival_id": 1100000002,
            "performance": "Performance 5",
            "starttime": "1100",
            "endtime": "1200",
            "popularity": 1
        },
        {
            "id": 7,
            "performance_id": 1000000007,
            "festival_id": 1100000002,
            "performance": "Performance 7",
            "starttime": "1030",
            "endtime": "1230",
            "popularity": 3
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/data?id=1234567890
```

### Sample Response

```json
{
    "result": [
        {
            "id": 1234567890,
            "property1": 1234567890,
            "property2": "haha",
            ...
        }
    ]
}
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
