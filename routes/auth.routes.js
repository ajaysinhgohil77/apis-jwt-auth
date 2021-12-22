const controllers = require("../controllers/auth.controller");
const checkEmailExists = require("../middlewares/check-email-exist");

module.exports = (app) => {
    app.post('/api/auth/signup', [checkEmailExists], controllers.signup);
    app.post('/api/auth/login', controllers.login);
}

