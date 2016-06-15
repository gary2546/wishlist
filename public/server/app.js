module.exports = function(app, mongoose, db, passport, LocalStrategy) {
    "use strict";

    var UserModel = require("./models/user.model.js")(mongoose);
    var CategoryModel = require("./models/category.model.js")(mongoose);
    var SaleModel = require("./models/sale.model.js")(mongoose, UserModel, CategoryModel);
    var CommentModel = require("./models/comment.model.js")(mongoose, UserModel, SaleModel);
    require("./services/user.service.server.js")(app, UserModel, passport, LocalStrategy);
    require("./services/category.service.server.js")(app, CategoryModel);
    require("./services/sale.service.server.js")(app, SaleModel);
    require("./services/comment.service.server.js")(app, CommentModel);
};