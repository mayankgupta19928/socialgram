const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 5000;
const {MONGOURI} = require('./keys')


mongoose.connect(`${MONGOURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to database');
})
mongoose.connection.on('error',()=>{
    console.log('get Error');
})

require('./models/user');
require('./models/post');

app.use(express.json());

app.use(require('./router/auth'))
app.use(require('./router/post'))


// const middleWare = (req,res,next) =>{
//     console.log('apply middleware')
//     next()
// }
// password D11nTUo6vtH8iDtS
// app.use(middleWare)
// app.get('/',(req,resp)=>{
// resp.send('Hiiii');
// })

    // app.get('/about',middleWare,(req,resp)=>{
    //     console.log('about');
    //     resp.send('about');
    // })

    app.listen(port,()=>{
        console.log('server is running on port ',port)
    })