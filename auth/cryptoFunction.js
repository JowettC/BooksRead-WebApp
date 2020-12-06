  
const crypto = require('crypto');
let cryptoFunctions = {
    sha512: (password, salt) =>{
        const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        const value = hash.digest('hex');
        return {
            passwordHash:value
        };
    },
    genRandomString: (length) => {
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    }
}
module.exports = cryptoFunctions;