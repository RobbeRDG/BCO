const User = require('../model/User');
const validator = require('express-validator');


exports.create_user_get = (req, res) => {
    res.render('register_form', { title: 'Registreer'});
}

exports.create_user = [
    // Check if not empty
    validator.body('voornaam', 'voornaam verplicht').isLength({ min: 1 }).trim(),
    validator.body('achternaam', 'achternaam verplicht').isLength({ min: 1 }).trim(),
    validator.body('email', 'E-mail verplicht').isLength({ min: 1 }).trim(),
    validator.body('password', 'Wachtwoord moet langer dan 6 tekens zijn').isLength({ min: 6 }).trim(),

    //Check if email
    validator.body('email', 'Dit is geen E-mail adres').isEmail(),
    

    //Sanitize body
    validator.sanitizeBody( 'voornaam' ).escape(),
    validator.sanitizeBody( 'achternaam' ).escape(),
    validator.sanitizeBody( 'email' ).escape(),
    validator.sanitizeBody( 'password' ).escape(),

    async(req, res) => {
        console.log(req.body)
        const errors = validator.validationResult(req)
        const temp = await User.findByEmail(req.body.email);
        if(!errors.isEmpty()){
            res.render('register_form', { 
                title: 'Registreer',
                voornaam: req.body.voornaam,
                achternaam: req.body.achternaam,
                email: req.body.email,
                password: req.body.password,
                errors: errors.array()
            });
            return;
        }
        if( temp === null){
            try {
                const user = new User({
                    voornaam : req.body.voornaam,
                    achternaam: req.body.achternaam,
                    email: req.body.email,
                    password: req.body.password
                })

                await user.save();
                const temp = await User.findByEmail(req.body.email)
                const userID = temp._id

                req.session.user = {
                    voornaam: user.voornaam,
                    achternaam: user.achternaam,
                    email: user.email,
                    id: userID
                }
                
                res.redirect('/')
                res.status(201).send({ user })
            } catch (error) {
                res.render('register_form', { 
                    title: 'Registreer',
                    topError: "Er is iets fout gegaan" 
                })
                console.log(error)
                res.status(400).send(error)
            }
        } else {
            res.render('register_form', {
                title: 'Registreer',
                voornaam: req.body.voornaam,
                achternaam: req.body.achternaam,
                email: req.body.email,
                password: req.body.password,
                alGeregistreerd: true
            });
            return;
        }
    }
]



exports.login_user_get = (req, res) => {
    res.render('login_form', { title: 'Inloggen'});
}


exports.login_user = [
        // Check if not empty
    validator.body('email', 'E-mail verplicht').isLength({ min: 1 }).trim(),
    validator.body('password', 'Wachtwoord moet langer dan 6 tekens zijn').isLength({ min: 6 }).trim(),

    //Check if email
    validator.body('email', 'Dit is geen E-mail adres').isEmail(),
    

    //Sanitize body
    validator.sanitizeBody( 'email' ).escape(),
    validator.sanitizeBody( 'password' ).escape(),

    async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            res.render('login_form', {
                 title: 'Inloggen',
                 email: req.body.email,
                 password: req.body.password,
                 fouteGegevens: true
                });
            return;
        }
        const userID = user._id.toString();
        req.session.user = {
            voornaam: user.voornaam,
            achternaam: user.achternaam,
            email: user.email,
            id: userID
        }
        res.render( 'index' ,  { voorNaam : user.voornaam } )
    } catch (error) {
        res.render('login_form', { 
            title: 'Inloggen',
            topError: "Er is iets fout gegaan" 
        })
        console.log(error)
        res.status(400).send(error)
    }
}
]

exports.get_loggedin_user = (req, res) => {
    // View logged in user profile
  const user = req.session.user;
  res.render('user' , { user })
}

exports.logout_user = async(req, res) => {
    // Log user out of the application
  try {
        if (req.session.user && req.cookies.user_sid) {
            req.session.destroy();
            res.clearCookie('user_sid');
            res.redirect('/')
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
