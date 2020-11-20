// from config/auth.config.js is exported a secretkey in the following format:
// module.exports = {
//     secret: "SomeString"
// }

const config = require("../config/auth.config");

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');