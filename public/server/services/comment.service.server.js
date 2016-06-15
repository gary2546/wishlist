module.exports = function(app, CommentModel) {
    "use strict";

    app.get('/api/project/comment', findAllComments);
    app.get('/api/project/sale/:saleId/comment', findAllCommentsBySaleId);
    app.get('/api/project/comment/:commentId', findCommentById);
    app.get('/api/project/user/:userId/helpful/comment', findAllFoundHelpfulCommentsByUserId);
    app.get('/api/project/user/:userId/reported/comment', findAllReportedCommentsByUserId);
    app.delete('/api/project/comment/:commentId', deleteComment);
    app.post('/api/project/sale/:saleId/comment', createComment);
    app.put('/api/project/comment/:commentId', updateComment);

    function findAllFoundHelpfulCommentsByUserId(req, res) {
        CommentModel.findAllFoundHelpfulCommentsByUserId(req.params.userId).then(
            function(comments) {
                res.json(comments);
            }
        );
    }

    function findAllReportedCommentsByUserId(req, res) {
        CommentModel.findAllReportedCommentsByUserId(req.params.userId).then(
            function(comments) {
                res.json(comments);
            }
        );
    }

    function findAllComments(req, res) {
        CommentModel.findAllComments().then(
            function(comments) {
                res.json(comments);
            }
        );
    }

    function findAllCommentsBySaleId(req, res) {
        CommentModel.findAllCommentsBySaleId(req.params.saleId).then(
            function(comments) {
                res.json(comments);
            }
        );
    }

    function findCommentById(req, res) {
        CommentModel.findCommentById(req.params.commentId).then(
            function(comment) {
                if (comment) {
                    res.json(comment);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function deleteComment(req, res) {
        CommentModel.deleteComment(req.params.commentId).then(
            function() {
                res.send(200);
            }
        );
    }

    function createComment(req, res) {
        CommentModel.createComment(req.params.saleId, req.body).then(
            function() {
                findAllComments(req, res);
            }
        );
    }

    function updateComment(req, res) {
        CommentModel.updateComment(req.params.commentId, req.body).then(
            function(newComment) {
                res.json(newComment);
            }
        )
    }
};