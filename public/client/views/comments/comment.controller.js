/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("CommentController", CommentController);

    function CommentController($scope, $rootScope, CommentService) {
        $scope.currentSelection = null;

        if(!$rootScope.user || !$rootScope.user.isAdmin) {
            $scope.logout();
            $scope.$location.url("/login");
        }

        getComments();

        function getComments() {
            CommentService.findAllComments().then(
                function(res) {
                    $scope.comments = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        $scope.addComment = function() {
            if($scope.text && $scope.saleId) {
                var comment = {
                    text: $scope.text,
                    saleId: $scope.saleId
                };

                CommentService.createComment($scope.saleId, comment).then(
                    function(res) {
                        $scope.comments.push(res.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.updateComment = function() {
            if ($scope.currentSelection !== null){
                var commentId = $scope.comments[$scope.currentSelection]._id;
                var comment = {
                    _id: commentId,
                    text: $scope.text,
                    saleId: $scope.saleId
                };

                CommentService.updateComment(commentId, comment).then(
                    function(res) {
                        $scope.comments[$scope.currentSelection] = comment;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.deleteComment = function(index) {
            if(index === $scope.currentSelection) {
                $scope.currentSelection = null;
            }

            CommentService.deleteComment($scope.comments[index]._id).then(
                function(res) {
                    $scope.comments.splice(index, 1);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.selectComment = function(index) {
            $scope.currentSelection = index;
            $scope.text = $scope.comments[index].text;
            $scope.saleId = $scope.comments[index].saleId;
        };

    }
})();