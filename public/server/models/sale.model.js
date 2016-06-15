/**
 * Created by gary on 4/21/16.
 */
var q = require('q');

module.exports = function(mongoose, UserModel, CategoryModel) {
    "use strict";

    var SaleSchema = require("./sale.server.schema.js")(mongoose);
    var SaleModel = mongoose.model("SaleModel", SaleSchema);

    var api = {
        findAllSales: findAllSales,
        findSaleById: findSaleById,
        findAllSalesByCategoryId: findAllSalesByCategoryId,
        findAllBoughtSalesByUserId: findAllBoughtSalesByUserId,
        findAllWishlistedSalesByUserId: findAllWishlistedSalesByUserId,
        findAllReportedSalesByUserId: findAllReportedSalesByUserId,
        deleteSale: deleteSale,
        createSale: createSale,
        updateSale: updateSale
    };

    function findAllSales() {
        var deferred = q.defer();
        SaleModel.find(function(err, sales) {
            deferred.resolve(sales);
        });
        return deferred.promise;
    }

    function findSaleById(saleId) {
        var deferred = q.defer();
        SaleModel.findById(saleId, function(err, sale) {
            deferred.resolve(sale);
        });
        return deferred.promise;
    }

    function findAllSalesByCategoryId(categoryId) {
        var deferred = q.defer();
        CategoryModel.findCategoryById(categoryId).then(
            function (category) {
                SaleModel.find({
                    "_id": { $in: category.sales }
                }, function(err, sales) {
                    deferred.resolve(sales);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findAllBoughtSalesByUserId(userId) {
        var deferred = q.defer();
        UserModel.findUserById(userId).then(
            function (user) {
                SaleModel.find({
                    "_id": { $in: user.boughtSales }
                }, function(err, sales) {
                    deferred.resolve(sales);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findAllWishlistedSalesByUserId(userId) {
        var deferred = q.defer();
        UserModel.findUserById(userId).then(
            function (user) {
                SaleModel.find({
                    "_id": { $in: user.wishlistedSales }
                }, function(err, sales) {
                    deferred.resolve(sales);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findAllReportedSalesByUserId(userId) {
        var deferred = q.defer();
        UserModel.findUserById(userId).then(
            function (user) {
                SaleModel.find({
                    "_id": { $in: user.reportedSales }
                }, function(err, sales) {
                    deferred.resolve(sales);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function deleteSale(saleId) {
        var deferred = q.defer();
        SaleModel.remove({_id: saleId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateSale(saleId, newSale) {
        var deferred = q.defer();
        SaleModel.findById(saleId, function(err, sale) {
            var fields = Object.keys(newSale);
            for (var i in fields) {
                sale[fields[i]] = newSale[fields[i]];
            }
            sale.save(function(err, doc) {
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    }

    function createSale(categoryId, newSale) {
        var deferred = q.defer();
        CategoryModel.findCategoryById(categoryId).then(
            function(category) {
                SaleModel.create(newSale, function(err, sale) {
                    if (err) {
                        deferred.reject(err);
                    }  else {
                        category.sales.push(sale);
                        category.save(function(err, category) {
                            deferred.resolve(category.sales);
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