module.exports = function(app, CategoryModel) {
    "use strict";

    app.post('/api/project/category', createCategory);
    app.get('/api/project/category', findAllCategories);
    app.get('/api/project/category/:categoryId', findCategoryById);
    app.put('/api/project/category/:categoryId', updateCategory);
    app.delete('/api/project/category/:categoryId', deleteCategory);

    function createCategory(req, res) {
        CategoryModel.createCategory(req.body).then(
            function(newCategory) {
                res.json(newCategory);
            }
        );
    }

    function findAllCategories(req, res) {
        CategoryModel.findAllCategories().then(
            function(categories) {
                res.json(categories);
            }
        );
    }

    function findCategoryById(req, res) {
        CategoryModel.findCategoryById(req.params.categoryId).then(
            function(category) {
                if (category) {
                    res.json(category);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function updateCategory(req, res) {
        CategoryModel.updateCategory(req.params.categoryId, req.body).then(
            function(newCategory) {
                res.json(newCategory);
            }
        );
    }

    function deleteCategory(req, res) {
        CategoryModel.deleteCategory(req.params.categoryId).then(
            function() {
                res.send(200);
            }
        );
    }
};