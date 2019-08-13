import Base from "../utils/BaseModel.js";
import Utils from '../utils/Utils.js';

export default class UserModel extends Base {
    constructor(){
        super();
        Utils.bindAll( this );
    }

    login( params, callBack ) {
        return Base.exec( 'SELECT int_user_id AS id FROM users WHERE st_login = $1 AND st_password = $2', 
                            [ params.login, params.password ], 
                            callBack );
    }

    create( params, callBack ) {
        return Base.exec( 'INSERT INTO users ( st_login, st_password ) VALUES ( $1, $2 )', 
                            [ params.login, params.password ], 
                            callBack );
    }
}