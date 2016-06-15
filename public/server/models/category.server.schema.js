/**
 * Created by gary on 4/21/16.
 */
module.exports = function(mongoose) {
    var CategorySchema = mongoose.Schema({
        title: String,
        sales: [{type: mongoose.Schema.Types.ObjectId, ref: 'sales'}],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'category'});
    return CategorySchema;
};