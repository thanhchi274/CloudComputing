var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    describe: String,
    dateChange: String,
    versionKey: false
})
var Product = mongoose.model('Product', productSchema, 'Product')
module.exports = Product