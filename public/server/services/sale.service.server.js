module.exports = function(app, SaleModel) {
    "use strict";

    app.get('/api/project/sale', findAllSales);
    app.get('/api/project/category/:categoryId/sale', findAllSalesByCategoryId);
    app.get('/api/project/sale/:saleId', findSaleById);
    app.get('/api/project/user/:userId/bought/sale', findAllBoughtSalesByUserId);
    app.get('/api/project/user/:userId/wishlisted/sale', findAllWishlistedSalesByUserId);
    app.get('/api/project/user/:userId/reported/sale', findAllReportedSalesByUserId);
    app.delete('/api/project/sale/:saleId', deleteSale);
    app.post('/api/project/category/:categoryId/sale', createSale);
    app.put('/api/project/sale/:saleId', updateSale);

    function findAllBoughtSalesByUserId(req, res) {
        SaleModel.findAllBoughtSalesByUserId(req.params.userId).then(
            function(sales) {
                res.json(sales);
            }
        );
    }

    function findAllWishlistedSalesByUserId(req, res) {
        SaleModel.findAllWishlistedSalesByUserId(req.params.userId).then(
            function(sales) {
                res.json(sales);
            }
        );
    }

    function findAllReportedSalesByUserId(req, res) {
        SaleModel.findAllReportedSalesByUserId(req.params.userId).then(
            function(sales) {
                res.json(sales);
            }
        );
    }

    function findAllSales(req, res) {
        SaleModel.findAllSales().then(
            function(sales) {
                res.json(sales);
            }
        );
    }

    function findAllSalesByCategoryId(req, res) {
        SaleModel.findAllSalesByCategoryId(req.params.categoryId).then(
            function(sales) {
                res.json(sales);
            }
        );
    }

    function findSaleById(req, res) {
        SaleModel.findSaleById(req.params.saleId).then(
            function(sale) {
                if (sale) {
                    res.json(sale);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function deleteSale(req, res) {
        SaleModel.deleteSale(req.params.saleId).then(
            function() {
                res.send(200);
            }
        );
    }

    function createSale(req, res) {
        SaleModel.createSale(req.params.categoryId, req.body).then(
            function() {
                findAllSales(req, res);
            }
        );
    }

    function updateSale(req, res) {
        SaleModel.updateSale(req.params.saleId, req.body).then(
            function(newSale) {
                res.json(newSale);
            }
        )
    }
};