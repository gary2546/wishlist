/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    redirectTo: "/home"
                })
                .when("/wishlist", {
                    templateUrl: "client/views/home/wishlist.view.html",
                    controller: "WishlistController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/users", {
                    templateUrl: "client/views/users/user.view.html",
                    controller: "UserController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/comments", {
                    templateUrl: "client/views/comments/comment.view.html",
                    controller: "CommentController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/login", {
                    templateUrl: "client/views/users/login.view.html",
                    controller: "LoginController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "client/views/users/register.view.html",
                    controller: "RegisterController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/sales", {
                    templateUrl: "client/views/sale/sale.view.html",
                    controller: "SaleController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/sale/new", {
                    templateUrl: "client/views/sale/add.view.html",
                    controller: "AddSaleController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/sale/:saleId", {
                    templateUrl: "client/views/sale/detail.view.html",
                    controller: "SaleDetailController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/category", {
                    templateUrl: "client/views/category/category.view.html",
                    controller: "CategoryController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/category/new", {
                    templateUrl: "client/views/category/add.view.html",
                    controller: "AddCategoryController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/category/:categoryId", {
                    templateUrl: "client/views/category/sale.view.html",
                    controller: "CategorySaleController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .when("/search/:searchSaleText", {
                    templateUrl: "client/views/sale/search.view.html",
                    controller: "SaleSearchController",
                    resolve: {
                        checkIfLoggedIn: checkIfLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    function checkIfLoggedIn($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin").success(
            function(user) {
                if (user !== "0") {
                    $rootScope.user = user;
                    $rootScope.loggedIn = true;
                } else {
                    $rootScope.user = null;
                    $rootScope.loggedIn = false;
                }
                deferred.resolve();
            }
        );

        return deferred.promise;
    }
})();