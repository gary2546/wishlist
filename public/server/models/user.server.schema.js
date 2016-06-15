module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        imageLink: String,
        email: String,
        isAdmin: {type: Boolean, default: false},
        boughtSales: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],
        wishlistedSales: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],
        reportedSales: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        foundHelpfulComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        reportedComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }, {collection: "wishlistUser"});
    return UserSchema;
};