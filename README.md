# Node.js mentoring

## Homework 1
### TASK 1.1
Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.

The program should be started from npm script via nodemon(i.e. npm run task1).

The program should be running in a stand-by mode and should not be terminated after the first-string processing.

### TASK 1.2

Write a program which should do the following:

Read the content of csv file from ./csv directory.

Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to json object.

Write the csv file content to a new txt file

Do not load all the content of the csv file into RAM via stream (read/write file content line by line).

In case of read/write errors, log them in the console.•The program should be started via npm script using nodemon(i.e. npm run task2).

### TASK 1.3
Rewrite the above-mentioned programs to use babel(https://babeljs.io/) and ES6modules.

### Run task scripts
`npm run task1`

`npm run task2`

`npm run task3-1`

`npm run task3-2`

## Homework 2
### TASK 2.1
Write a simple REST service withCRUD operations for User entity.
To create REST service, use ExpressJS (https://expressjs.com/).
The User should have the following properties(you can use UUIDas a user identifier (id))

Service should have the following CRUD operations for User:
− get user by id;
− create and update user;
− get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstring the login property: getAutoSuggestUsers(loginSubstring, limit)
− remove user (soft delete – user gets marked with isDeleted flag, but not removed from the collection).
Store user’s collection in the service memory (while the service is running)
To test the service CRUD methods,you can use Postman (https://www.getpostman.com/).

### TASK 2.2
Add server-side validation for create/update operations of Userentity:
all fields are required;
login validation is required;
password must contain letters and numbers;
user’s age must be between 4 and 130.
In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.
For requests validation use special packages like joi

### Run task script
`npm run start`

### Postman collection
Path `test/resources/nodeMentoring.postman_collection.json`

## Homework 3
### TASK 3.1
Add express middleware which will log which service method has been invoked and which arguments have been passed to it.

### TASK 3.2
Add express middleware which will log all unhandled errors and return a standard message with HTTP code 500(Internal Server Error). Remark:Do not modify the status code and the message for other errors like validation errors from the previous task.

Add error handling to process.on(‘uncaughtException’,...).

Add Unhandled promise rejection listener to log errors.

### TASK 3.3
Every method in the controllers should log the errors which should include the following information:

−method name

−arguments which have been passed to the method

−error message

### Run task script
`npm run start`

### Postman collection
Path `test/resources/nodeMentoring.postman_collection.json`

