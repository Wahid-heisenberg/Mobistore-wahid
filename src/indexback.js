const app = require ('./api/server')
const db = require ('./database/db')
const host = 'localhost'
const port = 5000
const userRoute = require('./api/user')
const workerRoute = require('./api/worker')
const stockRoute = require('./api/stock')
const transactionRoute = require ('./api/transaction')


app.use('/api/user',userRoute);
app.use('/api/worker',workerRoute);
app.use('/api/stock', stockRoute)
app.use('/api/transaction',transactionRoute)

app.listen(port , ()=> console.log(`server is running at ${host}:${port}`));