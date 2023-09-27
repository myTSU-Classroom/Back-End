## MyTSU Classroom API Guideline

### Endpoint
http://45.153.69.181/api

### Get all faculties
- URL
	- `/faculty`
- Method:
	- `GET`
- Response
```json
[
  {
    "_id":"65105348d5e17d0a4cc818bb",
    "faculty":"Institute of Applied Mathematics and Computer Science"
  }
]
```

___

### Get disciplines and groups
- URL
	- `/faculty/:faculty_id`
- Method 
	- `GET`

#### Example:

- Request
  - `/faculty/65105348d5e17d0a4cc818bb`

- Response
```json
[
  {
    "_id": "6511922cce8b634aee5c5095",
    "direction": "Fundamental Informatic and Informations Technology",
    "faculty_id": "65105348d5e17d0a4cc818bb",
    "group": [
      {
        "_id": "6511a22fa6c81762cea204f5",
        "group_code": "500101"
      },
      {
        "_id": "6511a22fa6c81762cea204f6",
        "group_code": "500102"
      },
      {
        "_id": "6511a22fa6c81762cea204f7",
        "group_code": "500103"
      },
      {
        "_id": "6511a22fa6c81762cea204f8",
        "group_code": "500104"
      },
      {
        "_id": "6511a22fa6c81762cea204f9",
        "group_code": "500105"
      }
    ]
  }
 ]
```

___

### Register a new user
- URL
	- `/register`
- Method 
	- `POST`

#### Example:

- Request
```json
{
	"name": "String",
	"birth_date": Number,
	"email": "String",
	"phone": "String",
	"role": "Student" / "Teacher",
	"faculty": "String",
	"direction": "String",
	"group": "String",
	"grade": Number,
	"avatar": File,
	"isAdmin": false,
}
```

The format in the example is in JSON but the actual type of the request is `form-data`. The birth date is in millisecond, the role is either "Student" or "Teacher", the avatar is a jpg/jpeg/png File.

- Response
```json
{
	"error": false,
      	"message": "User data has been saved.",
}
```
