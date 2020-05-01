
require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL, {useNewUrlParser: true});
let userRoutes = require("./routes/user.route")
let adminRoutes = require("./routes/admin.route")
let productRoutes = require("./routes/product.route")
let authRoutes = require("./routes/auth.route")
var apiProductRoute = require("./api/routes/product.route") 
var apiUserRoute = require("./api/routes/user.route")
var apiAuthRoute = require("./api/routes/auth.route")
const authMiddleware = require("./middlewares/auth.middleware")
app.locals.moment = require('moment');
app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.set('view engine', 'pug');
app.set('views','./views')
app.use("/users",authMiddleware.requireAuth,userRoutes)
app.use("/admin",adminRoutes)
app.use("/products",authMiddleware.requireAuth,productRoutes)
app.use("/auth",authRoutes)
app.use('/api/products',apiProductRoute)
app.use("/api/users", apiUserRoute)
app.use("/api/auth",apiAuthRoute)
app.get('/',authMiddleware.requireAuth,(req, res) => res.render('index',{name:'AAA'}))
app.get('/contact',(req, res) => res.render('./contact/contact'))
app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
