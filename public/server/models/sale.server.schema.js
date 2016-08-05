module.exports = function(mongoose) {
    var SaleSchema = mongoose.Schema({
        title: String,
        category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
        link: String,
        imageLink: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        description: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
        bought: {type: Number, default: 0},
        wishlisted: {type: Number, default: 0},
        reported: {type: Number, default: 0}
    }, {collection: 'sale'});
    return SaleSchema;
};