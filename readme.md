# Dynamic Data Mapper

Supports creation of a data specification for an external data for such that it
will map fields of the external data to data types (the data types are restricted to string,
integer and timestamp)
<br>
<br>

## Create Data Specification
Create your data specification by specifying unique fields and their data type (string, integer or timestamp) <br>
**POST** <br>
🌍 endpoint ➜  `` /data-mapper/createspec``
```
{
	"name": "string",
	"age": "integer",
	"sex": "string"
}
```

response 

```
{
	"success": true,
	"message": "Data Spec for your incoming data has been created. Please use your providerId for further operations on this platform",
	"spec": {
		"providerId": "61e8a05fd331de22d8d3d901",
		"fields": {
			"name": "string",
			"age": "integer",
			"sex": "string"
		},
		"_id": "61e8a05fd331de22d8d3d902",
		"__v": 0
	}
}
```
<br>

## Load Data
**POST** <br>
🌍 endpoint ➜ ``/data-mapper/ceatedata``

```
{
	"providerId": "61e8a05fd331de22d8d3d901",
	"data": [
		{
		"name": "nathaniel",
		"age": 27,
		"sex": "male"
	},
		{
		"name": "babalola",
		"age": 28,
		"sex": "female"
	}
	]
}
```

response

```
{
	"success": true,
	"data": {
		"providerId": "61e8a05fd331de22d8d3d901",
		"data": [
			{
				"name": "nathaniel",
				"age": 27,
				"sex": "male"
			},
			{
				"name": "babalola",
				"age": 28,
				"sex": "female"
			}
		],
		"_id": "61e8aa9f7509d3fdead91d04",
		"__v": 0
	}
}
```

## Filter Provided Data
**GET** <br>
<ul>
	<li> eqc: equalsIgnoreCase (string) </li> 
	<li> eq: equalsTo (timestamp and integer) </li> 
	<li> lt: lessThan (timestamp and integer) </li> 
	<li> gt: greaterThan (timestamp and integer) </li>
<ul>
🌍 endpoint ➜ ``/data-mapper/filter/61e8a05fd331de22d8d3d901?name=eqc:nathaniel&age=eq:27``

response
```
{
	"success": true,
	"filtered": [
		{
			"age": "27"
		},
		{
			"name": "nathaniel"
		}
	]
}
```
