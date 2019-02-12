# Building RESTful APIs with Express

## Topics:

x Node.js and Express.
x HTTP methods and status codes.
x Reading Request data from body, URL parameters and query string parameters.
x API design and development.

## Assignment

x Use Node.js and Express to build an API that performs _CRUD_ operations on `posts`.

**This is a two day project.**

x- **Due Monday**: the server with the `GET` endpoints.

- **Due Tuesday**: the `POST`, `PUT` and `DELETE` endpoints.

### Download Project Files and Install Dependencies

x **Fork** and **Clone** this repository.
x **CD into the folder** where you cloned the repository.
x Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.

### Database access

x Database access will be done using the `db.js` file xincluded inside the `data` folder. This file publishes the following methods:

x `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
x `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
x `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
x `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
x `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.

x Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Start the API and Implement Requirements

x To start the server, type `yarn server` or `npm run server` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.
x Add the code necessary to implement the API requirements.
x **Test the API using [Postman](https://www.getpostman.com/) as you work through the exercises.**

### Post Schema

x Posts in the database conform to the following structure:

```js
{
  title: "The post title", // String, required
  contents: "The post contents" // String, required
}
```

`title` is the title of the post, as a String. `contents` contains the body
contents of the post, also as a String.

### Provided Code

x We have provided an `index.js` file and a folder called `data`. Inside the `data` folder we have added a database with some posts already populated that you can use to test your endpoints as you build them.

x Server.js already has `db.js` required and ready for you to use when building your endpoints.

### Write endpoints to perform the following queries.

Configure the API to respond to the following routes:

| Method | Endpoint       | Description                                                                                                                                                                 |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/posts     | Creates a post using the information sent inside the `request body`.                                                                                                        |
| GET    | /api/posts     | Returns an array of all the post objects contained in the database.                                                                                                         |
| GET    | /api/posts/:id | Returns the post object with the specified id.                                                                                                                              |
| DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
| PUT    | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                                           |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

* When the client makes a `GET` request to `/api/posts`:

- If there's an error in retrieving the _posts_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.

When the client makes a `GET` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in retrieving the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in removing the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post could not be removed" }`.

When the client makes a `PUT` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If there's an error when updating the _post_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be modified." }`.

- If the post is found and the new information is valid:

  - update the post document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _post_.

## Stretch Problems

To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

- add the `cors` npm module: `yarn add cors` or `npm i cors`.
- add `server.use(cors())` after `server.use(express.json())`.

Create a new React application and connect it to your server:

- Use `create-react-app` to create an application inside the root folder, name it `client`.
- From the React application connect to the `/api/posts` endpoint in the API and show the list of posts.
- Style the list of posts however you see fit.
