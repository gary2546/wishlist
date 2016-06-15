var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(newUser) {
        var deferred = q.defer();
        UserModel.create(newUser, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            }
        );
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(credentials, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            var fields = Object.keys(newUser);
            for (var i in fields) {
                user[fields[i]] = newUser[fields[i]];
            }

            user.save(function(err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};