const jwtAuth = require("../middlewares/jwt-auth");
const userController = require("../controllers/user.controller");

const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })

module.exports = (app) => {
    app.put('/api/users/:id', [jwtAuth], userController.updateUser);
    app.get('/api/users/:id', [jwtAuth], userController.getUserDetails);
    app.patch('/api/users/change-password', [jwtAuth], userController.changePassword);
    app.post('/api/users/:id/upload-profile-picture', [jwtAuth], uploads.single('image'),
        userController.uploadProfilePicture
    );
}

