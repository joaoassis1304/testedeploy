import express from "express";
import session from 'express-session'
import path from "path"
import bodyParser from "body-parser";
import connectPgSimple from 'connect-pg-simple'
import router from '../routes/routes.js'


const __dirname = path.resolve()

const pgSession = connectPgSimple(session)

const app = express()

app.use(session({
    store: new pgSession({
        conString: process.env.CONNECTION_STRING,
        tableName:'session'
    }),
    secret:'oo_K(uOwN(k#|2Pm%+Sl>F(w/7k7|n',    
    resave: false,
    saveUninitialized: true,   
}))
app.use(express.json())

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname,'/views'))

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({ extended: true, limit:'2mb'}))

//app.use(express.urlencoded({limit:'2mb'}))

//app.use(express.urlencoded({extended:true}))

app.use('/',router)

export default app