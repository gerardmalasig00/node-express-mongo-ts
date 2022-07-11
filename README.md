# NODE TYPESCRIPT TEMPLATE

##### By Gerardo Malasig

## Pre-requisites

-   Install nodejs [v14](https://nodejs.org/en/) or higher
-   [MongoDB Compass](https://www.mongodb.com/products/compass)
-   Mongosh [v1.4](https://www.mongodb.com/docs/mongodb-shell/install/) or higher
-   Basic knowledge of NodeJS + ExpressJS, MongoDB, and Typescript

## MongoDB Setup

1. Make sure to install the MongoDB compass and Mongosh just follow the installation instruction check out the link on the pre-req.

2. Open your CLI and run _` mongosh`_ wait for a sec and it will open up the mongosh client.

3. Inside _mongosh_ client create a Database for your project by running _`use <Name of your DB>`_ it will automatically switch it to your newly created DB.
4. Now that we have database let's now create an admin user, to create a user you can copy the code below, but before pasting it in **mongosh** make sure to edit the _user_ and _db_ value because you will not be able to change it on CLI.

```
db.createUser({
    user: <Your Admin name>,
	pwd: passwordPrompt(),
	roles:[{role: "readWrite" , db:<Your DB>}]
})
```

notice in _pwd_ we use the _passwordPrompt()_ after creating user entering the code above the _mogosh_ will let us type our password for added security, so go ahead and type your user password.

5. Now that we have an admin user we can now put Auth in our db, to do that run this code.

```
db.auth(<Your admin name>, passwordPrompt())
```

type again your password.

6. To test you can run this `db.test.insertOne( { name: "Juan", message: "my testing" } )` to check all the collections run this `show collections` to check a specific collection value run this `db.test.find({})`

###### _For reference you can check out this [link](https://www.mongodb.com/docs/manual/tutorial/create-users/) from mongosh on how to create a user._

Now our MongoDB is ready let's now setup our source code.

## Source Code Setup

1. Clone this repository then open it to your favorite IDE.

2. Now that you have the files on your local machine let's now setup our environtment variables. Create a _.env_ file, after creating a file go to _.env.example_ then paste all the code inside of it to your newly created _.env_ file then insert the appropriate value, look at the code below for your reference.

```
NODE_ENV = development
PORT = 8000
HOST = http://localhost:8000
MONGO_HOST = 127.0.0.1:27017 // This will be the default of mongoDB from your local machine
MONGO_USER = <Your MongoDB user admin name that we created earlier>
MONGO_PASSWORD = <User Admin password>
MONGO_DBNAME = <Your DB Name>
```

3. Now our env variables setup is good let's now install the packages by running `npm install`.

4. Now let's try and start our server by running `npm run start`

5. Go now to your favorite API testing platform and test it by going to this path http://localhost:8000/api/post.

## MongoDB Compass

1. Open the MongoDB Compass, once the MongoDB Compass GUI opened, go to _new connection_ then click the "Fill in connection fields individually", in the _hostname_ tab insert this.

```
Hostname: 127.0.0.1
Port: 27017
Authentication: Username/Password
Username: <Your Admin Username>
Password: <Admin Password>
Authentication Database: <Your database>
```

2. Now it will open up your Local machine database, then click your database, Viola! you now have a MongoDB to your local machine.

---

##### Wohoo!! You now have a pre-setup NODE-EXPRESS-MONGODB-TYPESCRIPT!! Go ahead and Create useful API or personal project. Be creative, be responsible and be generous to share you knowdledge to others, so we can have a healthy developer community, this is the best that I can do(for now). I am open to your suggestion on how I can improve this, so feel free to add a discussion.

#### HAPPY CODING!!
