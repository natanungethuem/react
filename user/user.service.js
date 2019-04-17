import axios from 'axios';

export default class UserService {

    /**
     * { User: { st_login, st_password } }
     **/
    login( params ) {
        var sha256 = require('js-sha256');
        params.st_password = sha256( params.st_password );
        return axios.post( 'http://localhost:8081/user/login', params );
    }
}
