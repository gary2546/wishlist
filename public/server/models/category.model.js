/**
 * Created by gary on 4/21/16.
 */
var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var CategorySchema = require("./category.server.schema.js")(mongoose);
    var CategoryModel = mongoose.model("CategoryModel", CategorySchema);

    var api = {
        createCategory: createCategory,
        findAllCategories: findAllCategories,
        findCategoryById: findCategoryById,
        updateCategory: updateCategory,
        deleteCategory: deleteCategory
    };

    function createCategory(newCategory) {
        var deferred = q.defer();
        CategoryModel.create(newCategory, function(err, category) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(category);
                }
            }
        );
        return deferred.promise;
    }

    function findAllCategories() {
        var deferred = q.defer();
        CategoryModel.find(function(err, categories) {
            deferred.resolve(categories);
        });
        return deferred.promise;
    }

    function findCategoryById(categoryId) {
        var deferred = q.defer();
        CategoryModel.findById(categoryId, function(err, category) {
            deferred.resolve(category);
        });
        return deferred.promise;
    }

    function updateCategory(categoryId, newCategory) {
        var deferred = q.defer();
        CategoryModel.findById(categoryId, function(err, category) {
            var fields = Object.keys(newCategory);
            for (var i in fields) {
                category[fields[i]] = newCategory[fields[i]];
            }

            category.save(function(err, category) {
                deferred.resolve(category);
            });
        });
        return deferred.promise;
    }

    function deleteCategory(categoryId) {
        var deferred = q.defer();
        CategoryModel.remove({_id: categoryId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    return api;
};