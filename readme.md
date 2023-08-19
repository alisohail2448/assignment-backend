
# Assignment Backend

## Environment Variables

Before running this project, make sure to set the following environment variables in a `.env` file located in the root directory of the project:

- `PORT`: The port on which the server will run.
- `MONGODB_URL`: The URL to your MongoDB database.
- `JWT_SECRET`: The secret key used for JWT token generation and authentication.

Here's an example of a `.env` file:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=mysecretkey