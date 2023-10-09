const bcrypt = require('bcrypt');

/** 
@param {String} password The String
@returns {String} The string
*/
const generatePasswordHash = (password) => {
    const SALT = 10;
    return bcrypt.hash(password, SALT);
}


/** 
@param {String} password The String
@param {String} passwordHash The String
@returns {Boolean} 
*/
const comparePasswordHash = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

module.exports = { generatePasswordHash, comparePasswordHash }