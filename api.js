const express = require('express')
const app = express()
const port = 3004
const cors = require('cors')
//const cookieParser = require('cookie-parser')
const session = require('express-session')
const Product = require('./src/product')
const Cart = require('./src/cart')

app.use(express.static('statique'));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(express.json())
const db = require('./src/db_utils');
const { request } = require('express')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 } }))

user = {
  'firstname': "monprenom",
  'lastname': "monnom",
  'email': "monnom@domaine.fr",
  'password': "monpassword",
}
users = []


app.get('/welcome-page', (request, response) => {
  if (!request.session.panier) {
    request.session.panier = { products: [], total: { nb: 0, totalamount: 0 } }
  } else {
    console.log("welcome - panier initialised")
  }
  console.log("welcome - request.session", request.session.panier)
  response.send(request.session.panier)
})

app.post('/register', (request, response) => {
  console.log(request.body)
  users.push(request.body)
  console.log(users)
  response.send("Registered!")
})

app.post('/login', (request, response) => {
  let isEmailFounded = users.find(p => p.email == request.body.email)
  if (isEmailFounded !== "undefined") {
    let indexOfIsEmailFounded = users.indexOf(isEmailFounded)
    if (request.body.email == users[indexOfIsEmailFounded].email &&
      request.body.password == users[indexOfIsEmailFounded].password) {
      request.session.userid = request.body.email;
      console.log("req.session", request.session)
      response.send(`Authorized`);
    } else {
      console.log("Login - Erreur dans la saisie")
      response.send(`Notauthorized`);
    }
  }
  else {
    console.log("Email inexistant")
    response.send(`Compte inexistant`);
  }
})

app.get('/logout', (request, response) => {
  request.session.destroy();
  response.redirect('/welcome-page');
});


app.get('/get-products', (request, response) => {
  Product.findAll(products => {
    response.json(products)
  })
  response.cookie('monpremiercookie', 150);
})

app.get('/get-product/:id', (request, response) => {
  let productId = [request.params['id']]
  Product.findbyId(productId, product => {
    response.json(product)
  })
})

app.post('/new-product', (request, response) => {

  productToUpdate = new Product(
    request.body['name'],
    request.body['description'],
    request.body['picture'],
    parseFloat(request.body['price']).toFixed(2),
    request.body['longdescription'],
    request.body['origine'],
    parseInt(request.body['quantity']),
  )

  Product.add(Object.values(productToUpdate), () => {
    console.log("Product added")
    response.redirect("/get-products")
  })
})

app.post('/del-product', (request, response) => {
  let formData = [
    request.body['id']
  ]
  Product.del(formData, p => {
    console.log("Product deleted")
    response.redirect("/get-products")
  })
})

app.post('/update-product', (request, response) => {
  productToUpdate = new Product(
    request.body['name'],
    request.body['description'],
    request.body['picture'],
    parseFloat(request.body['price']).toFixed(2),
    request.body['longdescription'],
    request.body['origine'],
    parseInt(request.body['quantity']),
    request.body['id']
  )
  console.log("Product p", productToUpdate)
  Product.update(Object.values(productToUpdate), p => {
    console.log("Product updated")
    response.redirect("/get-products")
  })
})

app.get('/addToCart/:productId/:productQty', (request, response) => {
  let cartItem = {
    'id': request.params.productId,
    'qty': request.params.productQty,
  }
  if (request.session.panier) {
    Product.findbyId(cartItem.id, product => {
      Cart.add(cartItem.id, cartItem.qty, product.price, request.session.panier, () => {
        console.log("Produit ajouté")
        response.send(request.session.panier.total)
      })
    })
  } else {
    response.redirect('/welcome-page')
  }
})

app.get('/get-cart', (request, response) => {
  if (typeof request.session.panier === "undefined") {
    response.redirect('/welcome-page')
  } else {
    console.log("get-cart - request.session.panier ", request.session.panier)
    response.send(request.session.panier)
  }
})


app.get('/get-cartItem/:cartItemId', (request, response) => {
  if (typeof request.session.panier === "undefined") {
    response.redirect('/welcome-page')
  } else {
    let cartItemId = [request.params['cartItemId']]
    Product.findbyId(cartItemId, product => {
      Cart.getCartItem(cartItemId, product, request.session.panier,() => {
        console.log("Produit affiché avec le sous-total")
        response.send(product)
      })
    })

}
})

app.post('/del-cartItem', (request, response) => {
  let cartItemId = [request.body['id']]
  console.log("cartItemId", cartItemId)
  console.log("userData", request.session.panier)
  if (typeof request.session.panier === "undefined") {
    response.redirect('/welcome-page')
  } else {

  Product.findbyId(cartItemId, product => {
    Cart.delCartItem(cartItemId, product, request.session.panier,() => {
      console.log("Produit affiché avec le sous-total")
      console.log("userData", request.session.panier)
      response.send(request.session.panier)
    })
  })
}

}
)

app.post('/get-cartItem-amount', (request, response) => {
  if (typeof request.session.panier === "undefined") {
    response.redirect('/welcome-page')
  } else {
    let cartItemId = request.body['id'] 
    let cartItemQty = request.body['qty']   
    let cartItem = { }
    Product.findbyId(cartItemId, product => {
      Cart.updateCartItem(cartItemId, cartItemQty,product, request.session.panier,cartItem,() => {
        console.log("Produit modifié avec le sous-total")
        response.json(cartItem)
      })
    })
  }
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

