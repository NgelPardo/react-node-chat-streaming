const express = require('express');
const { getUserFromToken } = require('./helpers/jwt');

require('dotenv').config();
const { emailU } = require('./controllers/auth');

const { Server: Socketserver } = require('socket.io');
const http = require('http');
const cors = require('cors');
const { dbConnection } = require('./db/config');

//Creando el servidor
const app = express();
const server = http.createServer(app);
const io = new Socketserver(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

io.on('connection', (socket) => {
    //console.log(`Usuario conectado: ${socket.user.username}`);
    socket.on('message', ( body ) => {
        //console.log(`Mensaje recibido de ${socket.user.username}: ${message}`);
        console.log(socket.id)
        socket.broadcast.emit('message', {
            body,
            from: socket.id,
        });
    })
});

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth') );

//Escuchar peticiones
server.listen( process.env.PORT, () => {
    console.log(`Servidor en el puerto ${ process.env.PORT }`);
})

