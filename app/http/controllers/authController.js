const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController()
{
    return {
        login(req,res)
        {
                 res.render('auth/login')
        },
        postLogin(req, res, next){

            // const  name = req.body.name
            const  email = req.body.email
            const  password = req.body.password
           if(!email || !password)
           {
            req.flash('error', 'ALL fields are required')
         
            return res.redirect('/login')
           }


                  // check authentication 
               passport.authenticate('local', (err, user, info) => {
                if(err)
                {
                    req.flash('error', info.message)
                      return next(err)
                }if(!user)
                {
                    req.flash('error', info.message)
                      return res.redirect('/login')
                }
                req.logIn(user, (err)=>{
                    if(err)
                    {
                        req.flash('error', info.message)
                          return next(err);
                    }
                    return res.redirect('/')
                })
               })(req, res, next)
        },
        register(req,res)
        {
                 res.render('auth/register')
        },
      async postRegister(req,res){
            const  name = req.body.name
            const  email = req.body.email
            const  password = req.body.password
           if(!name || !email || !password)
           {
            req.flash('error', 'ALL fields are required')
            req.flash('name', name)
            req.flash('email', email)
              
            return res.redirect('/register')
           }

           // check if email exists
        //    User.exists({email: email}, (err, result) => {
        //     if(result)
        //     {
        //         req.flash('error', 'Email already exixts')
        //         req.flash('name', name)
        //         req.flash('email', email)
        //        return res.redirect('/register')
        //     }
        //    })
            
     // hash password
      const hashedPassword = await bcrypt.hash(password, 10)

           // create a user
           const user = new User({
              name,
              email,
              password: hashedPassword
           })

            user.save().then((user) => {
              
                // login
                return res.redirect('/')

            }).catch(err => {
                req.flash('error', 'Something went wrong')
               return res.redirect('/register')
            })
        },
        logout(req,res){
            req.logout(() => {});
            return res.redirect('/login')
        }
    }
}

module.exports = authController;
