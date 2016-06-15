(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("SaleDetailController", SaleDetailController);

    function SaleDetailController($scope, $rootScope, SaleService, UserService, CommentService) {
        var saleId = $scope.$location.url().replace("/sale/", "");
        getSale();
        inWishlist();
        getComments();

        function getComments() {
            CommentService.findCommentsBySale(saleId).then(
                function(res) {
                    $scope.comments = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        function getSale() {
            SaleService.findSale(saleId).then(
                function(res) {
                    $scope.sale = res.data;
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function inWishlist() {
            $scope.wishlisted = false;
            if($rootScope.user && $rootScope.user.wishlistedSales.indexOf(saleId) > -1) {
                $scope.wishlisted = true;
            }
        }

        $scope.addToWishlist = function() {
            if(!$rootScope.user) {
                $scope.$location.url("/login");
                return;
            }

            var user = {wishlistedSales: $rootScope.user.wishlistedSales};
            user.wishlistedSales.push(saleId);
            UserService.updateUser($rootScope.user._id, user).then(
                function(res) {
                    $rootScope.user = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );

            var sale = {wishlisted: $scope.sale.wishlisted + 1};
            SaleService.updateSale(saleId, sale).then(
                function(res) {
                    $scope.sale = res.data;
                },
                function(error){
                    console.log(error);
                }
            );

            $scope.wishlisted = true;
        };

        $scope.removeFromWishlist = function() {
            var user = {wishlistedSales: $rootScope.user.wishlistedSales};
            user.wishlistedSales = user.wishlistedSales.filter(function(id) { return id !== saleId; });
            UserService.updateUser($rootScope.user._id, user).then(
                function(res) {
                    $rootScope.user = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );

            var sale = {wishlisted: $scope.sale.wishlisted - 1};
            SaleService.updateSale(saleId, sale).then(
                function(res) {
                    $scope.sale = res.data;
                },
                function(error){
                    console.log(error);
                }
            );

            $scope.wishlisted = false;
        };

        $scope.isHelpful = function(comment) {
            if(!$rootScope.user) {
                return false;
            } else if($rootScope.user.foundHelpfulComments.indexOf(comment._id) > -1) {
                return true;
            }
            return false;
        };

        $scope.addHelpful = function(comment, index) {
            if(!$rootScope.user) {
                $scope.$location.url("/login");
                return;
            }

            var user = {foundHelpfulComments: $rootScope.user.foundHelpfulComments};
            user.foundHelpfulComments.push(comment._id);
            UserService.updateUser($rootScope.user._id, user).then(
                function(res) {
                    $rootScope.user = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );

            var newComment = {foundHelpful: comment.foundHelpful + 1};
            CommentService.updateComment(comment._id, newComment).then(
                function(res) {
                    $scope.comments[index] = res.data;
                },
                function(error){
                    console.log(error);
                }
            );
        };

        $scope.removeHelpful = function(comment, index) {
            var user = {foundHelpfulComments: $rootScope.user.foundHelpfulComments};
            user.foundHelpfulComments = user.foundHelpfulComments.filter(function(id) { return id !== comment._id; });
            UserService.updateUser($rootScope.user._id, user).then(
                function(res) {
                    $rootScope.user = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );

            var newComment = {foundHelpful: comment.foundHelpful - 1};
            CommentService.updateComment(comment._id, newComment).then(
                function(res) {
                    $scope.comments[index] = res.data;
                },
                function(error){
                    console.log(error);
                }
            );
        }

        $scope.postComment = function() {
            if(!$rootScope.user) {
                $scope.$location.url("/login");
                return;
            }

            var comment = {
                text: $scope.commentText,
                postedBy: $rootScope.user._id,
                foundHelpful: 0
            };
            CommentService.createComment(saleId, comment).then(
                function(res) {
                    $scope.comments.push(res.data[res.data.length - 1]);
                    $scope.commentText = "";
                },
                function(error){
                    console.log(error);
                }
            );
        }

    }
})();