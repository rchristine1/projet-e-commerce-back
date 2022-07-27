const db = require('./db_utils');

class Product {
    constructor(nameP, descriptionP, pictureP, priceP, longdescriptionP, origineP, quantityP, idP) {
        this.name = nameP,
        this.description = descriptionP,
        this.picture = pictureP,
        this.price = priceP,
        this.longdescription = longdescriptionP,
        this.origine = origineP,
        this.quantity = quantityP,
        this.id = idP
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getDescription() {
        return this.description
    }

    getPicture() {
        return this.picture
    }

    getPrice() {
        return this.price
    }

    getLongDescription() {
        return this.longdescription
    }

    getOrigine() {
        return this.origine
    }

    getQuantity() {
        return this.quantity
    }

    static add(formData,callback) {
        db.dbAddProduct(formData, callback)
    }

    static del(formData,callback) {
        db.dbDelProduct(formData, callback)
    }

    static update(formData,callback) {
        db.dbUpdateProduct(formData, callback )
    }

    static findAll(callback) {
        db.dbGetProducts(
            function (error, results, fields) {
                if (error) {
                    callback([])
                } else {
                    callback(results)
                }
            },
        )
    }

    static findbyId(productId, callback) {
        db.dbGetProduct(productId,
            function (error, results, fields) {
                if (error) {
                    callback({})
                } else {
                    callback(results[0])
                }
            },
        )
    }

}

module.exports = Product