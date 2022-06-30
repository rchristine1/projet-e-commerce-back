var mysql      = require('mysql');

function connectToMySQL(){
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ecommerce'
  });  
  connection.connect();
  return connection
}


function dbGetProducts(fonction_traitement_resultat_bdd){
  let connection = connectToMySQL()
  let query = "SELECT id,name,description,picture,price FROM products"  
  connection.query(query, fonction_traitement_resultat_bdd);
  connection.end();
}

function dbAddProduct(values_to_insert,fonction_apres_insertion){
  let connection = connectToMySQL()
  let query = `INSERT INTO products (name,description,picture,price,longdescription,origine,quantity) VALUES (?,?,?,?,?,?,?)`               
  console.log(query)
  connection.query(query,values_to_insert,(error, results)=>{
    if (error){
      console.log(error)
    }
    console.log("results:",results)
    console.log("after insert")
    connection.commit()
    connection.end()    
    fonction_apres_insertion()
  })            
}

function dbDelProduct(values_to_del,fonction_apres_insertion){
  let connection = connectToMySQL()
  let query = `DELETE FROM products WHERE id=? `               
  console.log(query)
  connection.query(query,values_to_del,(error, results)=>{
    if (error){
      console.log(error)
    }
    console.log("results:",results)
    console.log("after deletion")
    connection.commit()
    connection.end()    
    fonction_apres_insertion()
  })            
}

function dbGetProduct(productId,fonction_traitement_resultat_bdd){
  let connection = connectToMySQL()
  console.log("db_utils:",productId)
  let query = "SELECT * FROM products WHERE id=?" 
  console.log(query) 
  connection.query(query,productId,fonction_traitement_resultat_bdd);
  
  connection.end();
}

function dbUpdateProduct(values_to_update,fonction_apres_update){
  let connection = connectToMySQL()
  let query = `UPDATE products SET name=?,description=?,picture=?,price=?,longdescription=?,origine=?,quantity=? WHERE id=?`   
  console.log(query)     
            
  connection.query(query, values_to_update, (error,results) => {
    if (error){
      console.log(error)
    }
    console.log("results:",results)
    console.log("après update")
    connection.commit()
    connection.end()    
    fonction_apres_update()
  })
}

function dbUpdateQuantity(values_to_update,fonction_apres_update){
  let connection = connectToMySQL()
  let query = `UPDATE products SET quantity=? WHERE id=?`   
  console.log(query)    
            
  connection.query(query, values_to_update, (error,results) => {
    if (error){
      console.log(error)
    }
    console.log("results:",results)
    console.log("après update")
    connection.commit()
    connection.end()    
    fonction_apres_update()
  })
}

function dbGetCartItem(cartItemId,fonction_traitement_resultat_bdd){
  let connection = connectToMySQL()
  console.log("db_utils:",cartItemId)
  let query = "SELECT name,description,picture,price,quantity FROM products WHERE id=?"  
  console.log(query) 
  connection.query(query,cartItemId,fonction_traitement_resultat_bdd)   
  connection.end();
}

function dbGetCartItemPrice(cartItemId,fonction_traitement_resultat_bdd){
  let connection = connectToMySQL()
  let query = "SELECT price FROM products WHERE id=?"  
  console.log(query) 
  connection.query(query,cartItemId,fonction_traitement_resultat_bdd)   
  connection.end();
}


module.exports = {
  dbGetProducts: dbGetProducts,
  dbAddProduct:dbAddProduct,
  dbDelProduct:dbDelProduct,
  dbUpdateProduct:dbUpdateProduct,
  dbUpdateQuantity:dbUpdateQuantity,
  dbGetProduct: dbGetProduct,
  dbGetCartItem: dbGetCartItem,
  dbGetCartItemPrice:dbGetCartItemPrice,
  connectToMySQL:connectToMySQL,
  

}