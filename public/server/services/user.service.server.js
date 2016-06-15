module.exports = function(app, UserModel, passport, LocalStrategy) {
    "use strict";

    app.post('/api/project/user', createUser);
    app.post('/api/project/login', passport.authenticate('project-local'), login);
    app.post('/api/project/logout', logout);
    app.get('/api/project/loggedin', loggedIn);
    app.get('/api/project/user', findUsers);
    app.get('/api/project/user/:userId', findUserById);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);

    passport.use('project-local', new LocalStrategy(
        function(username, password, done){
            UserModel.findUserByCredentials({
                username: username,
                password: password
            }).then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
        }
    ));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel.findUserById(user._id).then(
            function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            }
        )
    }

    function createUser(req, res) {
        UserModel.createUser(req.body).then(
            function(newUser) {
                res.json(newUser);
            }
        );
    }

    function findUsers(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        } else {
            UserModel.findAllUsers().then(
                function(users) {
                    res.json(users);
                }
            );
        }
    }

    function findUserById(req, res) {
        UserModel.findUserById(req.params.userId).then(
            function(user) {
                if (user) {
                    res.json(user);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        UserModel.findUserByUsername(username).then(
            function(user) {
                if (user) {
                    res.json(user);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        UserModel.findUserByCredentials(credentials).then(
            function(user) {
                if (user) {
                    res.json(user);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function updateUser(req, res) {
        UserModel.updateUser(req.params.userId, req.body).then(
            function(newUser) {
                res.json(newUser);
            }
        );
    }

    function deleteUser(req, res) {
        UserModel.deleteUser(req.params.userId).then(
            function() {
                res.send(200);
            }
        );
    }
};