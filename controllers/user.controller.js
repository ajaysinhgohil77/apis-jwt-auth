const User = require('../models').user;
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports.updateUser = async (req, res) => {
    try {

        const userId = req.params.id;
        // destructure firstname, lastname, email
        const { firstname, lastname, email } = req.body

        const existingUser = await User.findOne({
            where: { id: userId }
        });

        if (!existingUser) {
            res.status(404).send({ message: "user not found" });
            return;
        }
        const objectToUpdate = {}

        if (firstname && firstname !== existingUser.firstname) {
            objectToUpdate.firstname = firstname
        }
        if (lastname && lastname !== existingUser.lastname) {
            objectToUpdate.lastname = lastname
        }
        if (email && email !== existingUser.email) {

            // check new provided email is exists
            const userDetailsForEmail = await User.findOne({
                where: { email }
            });
            if (userDetailsForEmail) {
                res.status(403).send({ message: "user already exists with this email" });
                return;
            }
            objectToUpdate.email = email
        }

        if (Object.keys(objectToUpdate).length > 0) {
            await User.update(
                objectToUpdate,
                { where: { id: userId } }
            )
            res.send({ message: 'user details updated' });
        } else {
            res.send({ message: 'nothing to update' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports.changePassword = async (req, res) => {
    try {
        // compare old password
        const { email, oldPassword, newPassword } = req.body;

        const user = await User.findOne({
            where: { email },
        })
        if (!user) {
            return res.status(404).send({ message: "user not available" });
        }

        const isPasswordValid = bcrypt.compareSync(oldPassword, user.password)

        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: "old password doesn't match" });
        }

        await User.update({
            password: bcrypt.hashSync(newPassword, 8)
        },
            {
                where: {
                    email
                }
            }
        );
        res.send({ message: 'password has been updated succesfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports.getUserDetails = async (req, res) => {
    try {
        // get id from params
        const userId = req.params.id;
        // query only firstname, lastname, email using model by id
        const user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        })
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    region: process.env.aws_bucket_region,
    accessKeyId: process.env.aws_s3_access_key,
    secretAccessKey: process.env.aws_s3_secret_access_key
});

const uploadFile = (file) => {
    const readStream = fs.createReadStream(file.path);
    const options = {
        Bucket: process.env.aws_bucket_name,
        Body: readStream,
        Key: `image-${Date.now()}.jpeg`,
    }
    return s3.upload(options).promise()
}

module.exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            res.status(404).send({ message: 'file not found' });
        }
        const result = await uploadFile(req.file);

        // update user profile picture field
        await User.update({
            profilePicture: result.Location
        },
            {
                where: { id: req.userId }
            }
        )
        // remove file from our server 
        fs.unlinkSync(req.file.path);
        res.status(200).send({ profilePicture: result.Location });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
