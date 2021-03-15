# memoizationApi
> Use memoization to optimize api, the api was made with nodejs and mongo db

## Endpoints 
### /   (post)
> stores data (value) by key.   
> value and key will be received on the body of the petition as json
```json
{
    "key":"6",
    "value": "just a reg"
}
```

### /:dbSrc (get)
> fetches data from a slow data source   
> dbSrc is the data source from the data will be extracted and return the data as the following example   
> for testing the data source is: "myDataSource"
```json
[
    {
        "_id": "604d477f684ae009642e0f98",
        "key": "1",
        "value": "reg 1",
        "__v": 0
    },
    {
        "_id": "604d4785684ae009642e0f99",
        "key": "2",
        "value": "reg 2",
        "__v": 0
    }
]
```

### /byKey/:key (get)
> retrieves data by key (if it exists)   
> key is the key of the register and return the data as the following example
```json
{
    "_id": "604d477f684ae009642e0f98",
    "key": "1",
    "value": "reg 1",
    "__v": 0
}
```
