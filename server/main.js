require('babel-register')({
    presets: [ 'env' ]
});

var express = require( 'express' );
var cors = require('cors');

const app = express();
app.use(express.json());
app.use( cors() );

app.use( '/user', require( './route/Route' ) );

/**
 * Para mudar a porta alterar o valor da variável de ambiente no SO, ex.:
 * SET PORT=8081
 */
app.listen( process.env.PORT || 8081 );
