const jwt = require('jsonwebtoken');

const generarJWT = ( uid, username ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid, username };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token');
            }
            resolve( token );
        } )
    })
}

function getUserFromToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
      console.log(decoded + "test");
      return {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      };
    } catch (error) {
      console.log(`Error al verificar el token: ${error.message}`);
      return null;
    }
  }

module.exports = {
    generarJWT,
    getUserFromToken,
}