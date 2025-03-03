const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController')
// const orderController = require('../app/http/controllers/customers/orderController')
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminorderController = require('../app/http/controllers/admin/orderController')


// all routes 
function initRoutes(app)
{
    app.get('/', homeController().index)
    
   
   // login routes 
    app.get('/login',guest, authController().login)
    app.post('/login',authController().postLogin)
    

     // register and logout route
    app.get('/register',guest, authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)


    app.get('/cart',cartController().index)
    app.post('/update-cart', cartController().update)
      

// customer routes 
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
   

//    admin routes
app.get('/admin/orders', auth, AdminorderController().index)


}


module.exports = initRoutes
