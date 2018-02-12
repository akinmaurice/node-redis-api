// Require Redis Here
const redis = require('redis');

// Connect to our Database
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

const md5 = require('md5');
const async = require('async');
/*
Function to handle the Index Route
*/
exports.getIndexPage = (req, res) => {
  res.json({ status: 200, message: 'Simple CRUD RESTFUL API using Node JS, Express JS, and Redis.' });
};

/*
MiddleWare to Validate Input
*/

exports.validateInput = (req, res, next) => {
  req.checkBody('name', 'Name must be provided').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('age', 'Age must be Provided!').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.json({ status: 400, errors, message: errors[0].msg });
    return;
  }
  next();
};


/*
Function to Create User
*/
exports.addUser = (req, res) => {
  // Get the User Details
  const newUser = req.body;
  newUser.id = md5(newUser.email);
  // Check if user exists
  client.exists(newUser.id, (err, reply) => {
    if (reply === 1) {
      return res.json({ status: 400, message: 'That user exists already', newUser });
    }
    // Add New User
    client.hmset(
      newUser.id, [
        'userId', newUser.id,
        'email', newUser.email,
        'name', newUser.name,
        'age', newUser.age,
      ]
      , (error, result) => {
        if (error) {
          return res.json({ status: 400, message: 'Something went wrong', error });
        }
        return res.json({
          result, status: 200, message: 'User Created', newUser,
        });
      },
    );
  });
};

/*
Function to get all Users
*/
exports.getUsers = (req, res) => {
  client.keys('*', (err, keys) => {
    if (err) {
      return res.json({ status: 400, message: 'could not fetch users', err });
    }
    if (keys) {
      async.map(keys, (key, cb) => {
        client.hgetall(key, (error, value) => {
          if (error) return res.json({ status: 400, message: 'Something went wrong', error });
          const user = {};
          user.userId = key;
          user.data = value;
          cb(null, user);
        });
      }, (error, users) => {
        if (error) return res.json({ status: 400, message: 'Something went wrong', error });
        res.json(users);
      });
    }
  });
};


/*
Functioon to get each User
*/
exports.getUser = (req, res) => {
  const { userId } = req.params;
  client.hgetall(userId, (err, user) => {
    if (err) {
      return res.json({ status: 400, message: 'Something went wrong', err });
    }
    return res.json(user);
  });
};


// Middleware to check user exists before update and Delete
exports.checkUserExists = (req, res, next) => {
  const { userId } = req.params;
  client.hgetall(userId, (err, user) => {
    if (err) {
      return res.json({ status: 400, message: 'Something went wrong', err });
    }
    if (!user) {
      return res.json({ status: 400, message: 'Could not find that user' });
    }
    next();
  });
};


/*
Function to Update User
*/
exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const updatedUser = req.body;
  client.hmset(
    userId, [
      'userId', userId,
      'email', updatedUser.email,
      'name', updatedUser.name,
      'age', updatedUser.age,
    ]
    , (err, result) => {
      if (err) {
        return res.json({ status: 400, message: 'Something went wrong', err });
      }
      return res.json({
        status: 200, result, message: 'User Updated', updatedUser,
      });
    },
  );
};


/*
Function to Delete Each User
*/
exports.deleteUser = (req, res) => {
  const { userId } = req.params;
  client.del(userId, (err, result) => {
    if (err) {
      return res.json({ status: 400, message: 'Something went wrong', err });
    }
    return res.json({ status: 200, message: 'User Deleted', result });
  });
};

