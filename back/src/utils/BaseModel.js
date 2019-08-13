const { Client } = require('pg');

const pool = {
    user: 'postgres',
    host: 'localhost',
    database: 'rentalburrow',
    password: 'root',
    port: 5432
  };
  
  
export default class Base {
    static exec( sql, params, callBack ) {
        const client = new Client( pool );
        client.connect();
        const res = client.query( sql, params, 
            ( err, data ) => {
                const result = callBack( data, err );
                client.end();
                return result;
            } );
        return res;
    }
}