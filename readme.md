# create database

1. run `npm install sequlize-cli -g`
2. provide username and password of database in `config/config.json` to connect mysql-server
3. run `sequlize-cli db:create`

* Note : if database(`practicedb`) created manually, no need to go through above steps 


# all parameters and keys need to be provided as env variables
# .env file
* aws_bucket_name
* aws_bucket_region
* aws_s3_access_key
* aws_s3_secret_access_key
* db_host
* db_user
* db_password
* db_name
* db_dialect
* jwtSecret


# to run server
run `npm run start` and service will be up at `localhost:8080` or provided port 


# routes
* auth routes - `/api/auth`
* user routes - `/api/users`


# flow of the applicaton 
there is no default user, so signup is must at first

1. user have to signup in app first - POST `/api/auth/signup`
2. login in app - POST `/api/auth/login`
3. check details of user with header:`access-token` provided at login time - GET `/api/users/:id`
4. user can update details like firstname, lastname, email - PUT `/api/users/:id`
5. user can add/update profile picture - POST `/api/users/update-profile-picture`
6. user can change old password - PATCH `/api/users/change-password`