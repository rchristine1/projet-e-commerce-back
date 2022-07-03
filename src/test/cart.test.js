const Cart = require('../cart')

test('adding a product id 200, quantity 2 to the cart' ,() => {

   let cart = {'products':[{'id':102,'qty':5}],'total':{'nb':5,'totalamount':50}}

    expect(Cart.add(200, 2,45, cart)).toStrictEqual({'products':[{'id':102,'qty':5},{'id':200,'qty':2}],'total':{'nb':7,'totalamount':140}});
        
})