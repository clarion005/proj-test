import express from 'express'
import cors from 'cors'
import session from 'express-session'

import employeesRouter from './routes/employeesRoute.js'
import authRouter from './routes/authRoute.js'
import dataReportRouter from './routes/dataReportsRoute.js'
import customersRouter from './routes/customersRoute.js'
import ingredientsRouter from './routes/ingredientsRoute.js'
import productsRouter from './routes/productsRoute.js'
import transactionsRouter from './routes/transactionsRoute.js'
import recipesRouter from './routes/recipesRoute.js'
import purchase_ordersRouter from './routes/purchase_ordersRoute.js'
import scheduled_shiftsRouter from './routes/scheduled_shiftsRoute.js'
import sectionsRouter from './routes/sectionsRoute.js'
import tablesRouter from './routes/tablesRoute.js'
import timeclock_entriesRouter from './routes/timeclock_entriesRoute.js'
import pay_periodsRouter from './routes/pay_periodsRoute.js'
import printersRouter from './routes/printersRoute.js'
import product_ordersRouter from './routes/product_ordersRoute.js'
import payroll_recordsRouter from './routes/payroll_recordsRoute.js'
import pnlRouter from './routes/pnlRoute.js'


const app = express()
const port = process.env.PORT || 3030

app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  "https://po-s-db-proj.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) return callback(null, true)

      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true,
  })
)

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
    app.set("trust proxy", 1);
}

const expiration_30_minutes = 1000 * 60 * 30
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: expiration_30_minutes,
    },
  })
)

app.use('/employees', employeesRouter)
app.use(authRouter)
app.use('/data-reports', dataReportRouter)
app.use('/customers', customersRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/products', productsRouter)
app.use('/transactions', transactionsRouter)
app.use('/recipes', recipesRouter)
app.use('/purchase-orders', purchase_ordersRouter)
app.use('/scheduled-shifts', scheduled_shiftsRouter)
app.use('/sections', sectionsRouter)
app.use('/tables', tablesRouter)
app.use('/timeclock-entries', timeclock_entriesRouter)
app.use('/pay-periods', pay_periodsRouter)
app.use('/printers', printersRouter)
app.use('/product-orders', product_ordersRouter)
app.use('/payroll-records', payroll_recordsRouter)
app.use('/pnl', pnlRouter)


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`)
})
