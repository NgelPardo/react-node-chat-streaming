/*
    Rutas de usuarios
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [   //middlewares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
    ],
    crearUsuario 
);

router.post(
    '/', 
    [   //middlewares
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
    ],
    loginUsuario
);

router.post('/renew', validarJWT, revalidarToken);

module.exports = router;