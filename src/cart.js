function calculQuantityCart(panierElements) {
    let tableauTmp = []
    for (let i = 0; i < panierElements.length; i++) {
        tableauTmp.push(parseInt(panierElements[i].qty))
    }
    const initialValue = 0;
    const sumWithInitial = tableauTmp.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    return sumWithInitial
}

class Cart {

    nbItemsCart(lastQtyProduct, newQtyProduct, numberItems) {
        numberItems = numberItems + (newQtyProduct - lastQtyProduct)
    }

    totalAmountCart(lastQtyProduct, newQtyProduct, priceProduct, totalAmount) {
        if (newQtyProduct > lastQtyProduct) {
            totalAmount = totalAmount + priceProduct * (newQtyProduct - lastQtyProduct)
        } else {
            if (newQtyProduct < lastQtyProduct)
                totalAmount = totalAmount - priceProduct * (lastQtyProduct - newQtyProduct)
        }
    }




    static add(idP, quantityP, priceP, cart, callback) {

        let product = { id: idP, qty: quantityP }

        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == product.id)
        let foundProductItem = cart.products[indexOfFoundProductItem]
        if (foundProductItem) {
            let lastQty = cart.products[indexOfFoundProductItem].qty
            cart.products[indexOfFoundProductItem].qty = quantityP
            nbItemsCart(lastQty, cart.products[indexOfFoundProductItem].qty, cart.total.nb)
            totalAmountCart(lastQty, cart.products[indexOfFoundProductItem].qty, priceP, cart.total.totalamount)
            console.log("addToCart - request.session.panier.total", cart.total)
        } else {
            cart.products.push(product)
            cart.total.nb = cart.total.nb + parseInt(product.qty)
            cart.total.totalamount = cart.total.totalamount + priceP * product.qty
            console.log("addToCart request.session.panier.total", cart.total)
            callback()
        }
    }

    static getCartItem(idP, product, cart, callback) {
        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == idP)
        product['amount'] = product.price * cart.products[indexOfFoundProductItem].qty
        callback()
    }

    static delCartItem(idP, product, cart, callback) {
        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == idP)
        cart.total.totalamount =
            cart.total.totalamount - product.price * cart.products[indexOfFoundProductItem].qty
        cart.products.splice(indexOfFoundProductItem, 1)
        cart.total.nb = calculQuantityCart(cart.products)
        callback()
    }

    static updateCartItem(idP, qtyP, product, cart, cartItem, callback) {
        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == idP)
        let foundProductItem = cart.products[indexOfFoundProductItem]
        if (foundProductItem) {
            let lastQty = cart.products[indexOfFoundProductItem].qty
            cart.products[indexOfFoundProductItem].qty = qtyP
            product['amount'] = product.price * cart.products[indexOfFoundProductItem].qty
            cart.total.nb = calculQuantityCart(cart.products)
            cart.total.totalamount = cart.total.totalamount
                + product.price * (cart.products[indexOfFoundProductItem].qty - lastQty)
            cartItem['item'] = product
            cartItem['cart'] = cart
            callback()
        }
    }






    /* let foundProductItem = request.session.panier.products.find(p => p.id == cartItemId)
     db.dbGetCartItem(cartItemId,
       function (error, results, fields) {
         console.log(results[0])
         if (request.body['qty'] <= results[0].quantity) {
           request.session.panier.products[indexOfFoundProductItem].qty = request.body['qty']
           console.log("request.session.panier après", request.session.panier)
           results[0]['amount'] = results[0].price * foundProductItem.qty
           console.log("1.results[0]", results[0])
           request.session.panier.total.nb = calculQuantityPanier(request.session.panier.products)
           request.session.panier.total.totalamount = request.session.panier.total.totalamount
             + calculMontantItem(results[0].price, (foundProductItem.qty - last_qty))
           console.log("request.session.panier.total", request.session.panier.total)
           console.log("request.session.panier.products", request.session.panier.products)
           response.json({ item: results[0], cart: request.session.panier })
         } else {
           results[0]['amount'] = results[0].price * foundProductItem.qty
           console.log("1.results[0]", results[0])
           request.session.panier.total.nb = calculQuantityPanier(request.session.panier.products)
           request.session.panier.total.totalamount = request.session.panier.total.totalamount
             + calculMontantItem(results[0].price, (foundProductItem.qty - last_qty))
           console.log("request.session.panier.total", request.session.panier.total)
           console.log("request.session.panier.products", request.session.panier.products)
           response.json({ item: results[0], cart: request.session.panier })
         }*/
}



module.exports = Cart;