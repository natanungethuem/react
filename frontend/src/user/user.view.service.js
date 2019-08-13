import axios from 'axios';

export default class UserService {

    /**
     * { User: { st_login, st_password } }
     **/
    login( params ) {
        let sha256 = require('js-sha256');
        return axios.post( '/user/login', { login: params.email, 
                                            password: sha256( params.password ) } );
    }
}
