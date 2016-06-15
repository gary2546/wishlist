/**
 * Created by gary on 4/21/16.
 */
var q = require('q');

module.exports = function(mongoose, UserModel, SaleModel) {
    "use strict";

    var CommentSchema = require("./comment.server.schema.js")(mongoose);
    var CommentModel = mongoose.model("CommentModel", CommentSchema);

    var api = {
        findAllComments: findAllComments,
        findCommentById: findCommentById,
        findAllCommentsBySaleId: findAllCommentsBySaleId,
        findAllFoundHelpfulCommentsByUserId: findAllFoundHelpfulCommentsByUserId,
        findAllReportedCommentsByUserId: findAllReportedCommentsByUserId,
        deleteComment: deleteComment,
        createComment: createComment,
        updateComment: updateComment
    };

    function findAllComments() {
        var deferred = q.defer();
        CommentModel.find(function(err, comments) {
            deferred.resolve(comments);
        });
        return deferred.promise;
    }

    function findCommentById(commentId) {
        var deferred = q.defer();
        CommentModel.findById(commentId, function(err, comment) {
            deferred.resolve(comment);
        });
        return deferred.promise;
    }

    function findAllCommentsBySaleId(saleId) {
        var deferred = q.defer();
        SaleModel.findSaleById(saleId).then(
            function (sale) {
                CommentModel.find({
                    "_id": { $in: sale.comments }
                }, function(err, comments) {
                    deferred.resolve(comments);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findAllFoundHelpfulCommentsByUserId(userId) {
        var deferred = q.defer();
        UserModel.findUserById(userId).then(
            function (user) {
                CommentModel.find({
                    "_id": { $in: user.foundHelpfulComments }
                }, function(err, comments) {
                    deferred.resolve(comments);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findAllReportedCommentsByUserId(userId) {
        var deferred = q.defer();
        UserModel.findUserById(userId).then(
            function (user) {
                CommentModel.find({
                    "_id": { $in: user.foundHelpfulComments }
                }, function(err, comments) {
                    deferred.resolve(comments);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function deleteComment(commentId) {
        var deferred = q.defer();
        CommentModel.remove({_id: commentId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateComment(commentId, newComment) {
        var deferred = q.defer();
        CommentModel.findById(commentId, function(err, comment) {
            var fields = Object.keys(newComment);
            for (var i in fields) {
                comment[fields[i]] = newComment[fields[i]];
            }
            comment.save(function(err, comment) {
                deferred.resolve(comment);
            });
        });
        return deferred.promise;
    }

    function createComment(saleId, newComment) {
        var deferred = q.defer();
        SaleModel.findSaleById(saleId).then(
            function(sale) {
                CommentModel.create(newComment, function(err, comment) {
                    if (err) {
                        deferred.reject(err);
                    }  else {
                        sale.comments.push(comment);
                        sale.save(function(err, sale) {
                            deferred.resolve(comment);
                        });
                    }
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    return api;
};