The backend of this application contains all the endpoints to perform different actions, such as getting all users, searching by id, registering a new user and logging into your account.

For the database, PostgreSQL is used for development.

This was achieved using the following technologies.

- TypeScript
- Node Js
- TypeOrm
- Express
- Json Web Token
- Bcrypt

In order to download the project, you have to clone the github repository, executing the following command in the terminal:

```
git clone https://github.com/matiasfeliu92/restApi-users.git
```

Then you have to access the project folder by executing the following command in the terminal:

```
cd restApi-users
```

Then you have to install the dependencies contained in the package.json file by executing the following command in the terminal:

```
npm install
```

Finally to execute the project we use the following command:

```
npm run dev
```

## Routes

**
All paths start with "/users"

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/`       |    GET    | Returns all users |
| `/:id` |    GET    | Returns the found user with that id |
| `/signup` |    POST    | Register a new user |
| `/signin` |    POST    | Authenticates the user and allows access to their account |