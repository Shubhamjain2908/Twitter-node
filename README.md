# Twitter-node
A twitter clone Node application is an attempt to clone some of the functionalities of twitter.
By providing REST API endpoints in it.

The api's are written in [NodeJS](https://nodejs.org/en/).

Steps to run the api server:
> Make sure you have NodeJS version 10 or higher installed & Postgres for database.
1) Clone this repository.
2) Navigate to repository folder and execute the following command:
    `npm install`
3) Run the following command to install `knexJS` globally.:
    `npm i -g knex`
4) Create a DB in postgres. Make note of DB name along with username, password and host. You machine should be able to connect to database using any DB client (PgAdmin, DBeaver). Also grant all privillages to it.
5) Run `npm start` in root directory of project to start the api server. This will start the server & execute knex mirations which will automatically create tables & teir relations. Server will listen on port `8641`.
7) Import the following postman collection to have a look at the api's and try them out yourself. Set the following environment variable in postman.
    `url : localhost:8641/api`
8) To run tests use the following command: `npm run test`
___

### API Endpoints (localhost:8641/api/*)

All the parameters in all the api's are required, unless state optional

Link to [Postman Collection](https://www.getpostman.com/collections/54bd2e84b27ad2b4dcb0)

#### Signup
**route - /signup**

**type: POST**

 Api for creating a new User

#### Parameters In *raw-JSON* Body
>{
	"username":"testuser",
	"password":"123456"
}
___
#### Login
**route - /login**

**type: POST**

 Api for Logging in a User

#### Parameters In *x-www-form-urlencoded* Body
> {
	"username":"testuser",
	"password":"123456"
}

___
#### Follow A User
**route - /follow**

**type: POST**

 Api To Follow a User

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response

___
#### Unfollow A User
**route - /unfollow**

**type: POST**

 Api To Follow a User

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response

___
#### Feed Tweets
**route - /tweet/feed**

**type: POST**

 Api for Getting tweets of the people whom Current User is following
#### Headers
 > Authorizations header with Bearer token provided in Login Api's response

___

#### Tweet
**route - /tweet**

**type: POST**

 Api for Creating a tweet

#### Headers
 > Authorizations header with Bearer token provided in Login Api's response


#### Parameters In *raw-JSON* Body
> {
	"tweet" : "Tweet content"
}


___
#### Delete Tweet
**route - /tweet/:id**

**type: DELETE**

 Api To Delete A Tweet

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response

#### Parameters In *url params* Body
> tweet id be deleted in url string

___

___
#### Like A Tweet
**route - /tweet/like**

**type: POST**

 Api To Like a tweet

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response

___
#### Unlike A Tweer
**route - /tweet/unlike**

**type: POST**

 Api To unlike a tweet

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response
___

___
#### Retweet A Tweet
**route - /retweet/**

**type: POST**

 Api To Retweet a tweet

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response

___
#### Unlike A Tweet
**route - /undoretweet**

**type: POST**

 Api To Undo a retweeted tweet

#### Parameters In *raw-JSON* Body
> {
	"id":"1"
}

 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response
___

___
#### Reply to A Tweet
**route - /tweet/reply/:id**

**type: POST**

 Api To reply to a tweet

#### Parameters In *raw-JSON* Body
> {
	"tweet" : "Tweet content"
}

#### Parameters In *url params* Body
> tweet id to which you have to reply


 #### Headers
 > Authorizations header with Bearer token provided in Login Api's response
___

#### Postman Collection

Link: [https://www.getpostman.com/collections/54bd2e84b27ad2b4dcb0](https://www.getpostman.com/collections/54bd2e84b27ad2b4dcb0)

For authorization add authorization in collection and all the request will inherit it.