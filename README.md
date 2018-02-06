# iflix backend

### Dependencies
  - Node v8.5.0
  - MongoDb v3.6.0
  - Yarn 1.3.2

### Steps for running API (connected to online database with some dummy data - mLab)
  - git clone git@github.com:shouheiyamauchi/iflix-backend.git
  - yarn install
  - yarn run dev
  - yarn run test (recommended to run on localTest if local db set up correctly otherwise it will run quite slow)

Dummy usernames already created: admin, iflix_user, shouhei, john (all with the password 'password')

'yarn' command can be replaced with 'npm'

### Steps for running API (local db)
  - git clone git@github.com:shouheiyamauchi/iflix-backend.git
  - yarn install (or npm install)
  - sudo mongod
  - yarn run localDev (or npm run dev)
  - yarn run localTest

The environmental variable LOCAL_DB_URL inside the .env file (not in .gitignore for simplicity sake) points to the local database URL. Assumes no username / password set up and using default port 27017. If there are any variations to this, update the url using following format:
mongodb://[username]:[password]localhost:[port]/iflix-app

mongodb://[username]:[password]localhost:[port]/iflix-app-test

### Efficiency Considerations
  - A snapshot of the average, and number of each 1 ~ 5 rating is taken on each rating submission so there is no need to perform expensive db operations on each average rating display
  - Pagination for listing out all contents so each API call gives back only limited number of results

### Future Improvements
  - Password should be encrypted (e.g. using bcrypt)
  - Expiration on user tokens
  - Duplication check of movie titles
  - Filterable/sortable contents list

### API Endpoints
  - GET http://localhost:3001/api/v1/users?pageNo=[pageNumber]&resultsPerPage=[resultsPerPage]
  - POST http://localhost:3001/api/v1/users/signup?username=[username]&password=[password]
  - POST http://localhost:3001/api/v1/users/login?username=[username]&password=[password]
  - **PUT http://localhost:3001/api/v1/users/[userId]?password=[newPassword]**
  - **POST http://localhost:3001/api/v1/users/change-role?userId=[userId]&role=[role]**
  - **DELETE http://localhost:3001/api/v1/users/[userId]**
  - GET http://localhost:3001/api/v1/contents?pageNo=[pageNumber]&resultsPerPage=[resultsPerPage]&includeRating=[boolean]
  - GET http://localhost:3001/api/v1/contents/[contentId]
  - **POST http://localhost:3001/api/v1/contents?title=[title]&genre=[genre]&releaseDate=[MM-DD-YYYY]&thumbnail=[imageUrl]**
  - **PUT http://localhost:3001/api/v1/contents/[contendId]?title=[title]&genre=[genre]&releaseDate=[MM-DD-YYYY]&thumbnail=[imageUrl]**
  - **DELETE http://localhost:3001/api/v1/contents/[contendId]**
  - GET http://localhost:3001/api/v1/ratings/[contentId]
  - **POST http://localhost:3001/api/v1/ratings?contentId=[contentId]&userId=[userId]&stars=[1~5]**

### Protected Endpoints
All endpoints in bold above are protected endpoints which require the user to be logged in. In order to achieve this, login from: http://localhost:3001/api/v1/users/login?username=[username]&password=[password] then the resulting JSON will include a token. Using Postman (or any similar client) add this to the Authorization header appended with 'JWT '. So for example: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzYTIxZmI0ODU3MjllYTczOTEzMCIsImlhdCI6MTUxNzgyOTc5MH0.-uZAveSJqjzLI2L7BoVforOf0_jHcdxHmQcnpE4K9g0' will be the Authorization header. The content manipulation and change-role end points require an admin user to be logged in. A sample admin user has been created with the following details: username - admin; password - password

### Roles of Each File Type
  - Controller - sets http status and sends response
  - Services - accesses model and create, view, manipulate data to send back to controller
  - Routes - specify the routes without the prefix
  - Parent Routes - add prefix based on feature
  - Models - shared by application regardless of API version
  - Helpers - application wide functions
