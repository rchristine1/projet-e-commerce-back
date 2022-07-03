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

function nbItemsCart(lastQtyProduct, newQtyProduct, numberItems) {
    numberItems = numberItems + (newQtyProduct - lastQtyProduct)
    return numberItems
}

function totalAmountCart(lastQtyProduct, newQtyProduct, priceProduct, totalAmount) {
    if (newQtyProduct > lastQtyProduct) {
        totalAmount = totalAmount + priceProduct * (newQtyProduct - lastQtyProduct)
    } else {
        if (newQtyProduct < lastQtyProduct) {
            totalAmount = totalAmount - priceProduct * (lastQtyProduct - newQtyProduct)
        }
    }
    return totalAmount.toFixed(2)
}

class Cart {  


    static add(idP, quantityP, priceP, cart) {

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
        }
        return cart
    }

    static getCartItem(idP, product, cart) {
        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == idP)
        product['amount'] = product.price * cart.products[indexOfFoundProductItem].qty
        return product
    }

    static delCartItem(idP, product, cart) {
        let indexOfFoundProductItem = cart.products.findIndex(p => p.id == idP)
        console.log("**** indexOfFoundProductItem", indexOfFoundProductItem)
        cart.total.totalamount =
            cart.total.totalamount - product.price * cart.products[indexOfFoundProductItem].qty
        cart.products.splice(indexOfFoundProductItem, 1)
        console.log("**** cart.products", cart.products)
        cart.total.nb = calculQuantityCart(cart.products)
        return cart
    }

    static updateCartItem(idP, qtyP, product, cart, cartItem) {
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
        }
        return cartItem
    }

}



module.exports = Cart;