const { response } = require('express');
const { validationResult } = require('express-validator');
const pool = require('../db/config');
const { generarJWT } = require('../helpers/jwt');

var emailU = '';

const crearUsuario = (req, res = response ) => {

    const { name, email, password } = req.body;

    //manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const rows = await pool.query('SELECT * FROM bt8c0sci9goftzams4ec.users2 WHERE username = ?', [email]);
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            });
        }

        const token = await generarJWT( rows.idusers, rows.username );
        emailU = rows[0].username;
        res.json({
            ok:true,
            uid: rows[0].idusers,
            username: rows[0].username,
            token
        })
    } catch (error) {
        console.log(error);
    }
    //manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, username } = req;

    const token = await generarJWT( uid, username );

    res.json({
        ok: true,
        uid, username,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    emailU,
}