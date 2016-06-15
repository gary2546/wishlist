/**
 * Created by gary on 4/21/16.
 */
module.exports = function(mongoose) {
    var CommentSchema = mongoose.Schema({
        text: String,
        postedBy: String,
        foundHelpful: {type: Number, default: 0},
        reported: {type: Number, default: 0}
    }, {collection: "comment"});
    return CommentSchema;
};