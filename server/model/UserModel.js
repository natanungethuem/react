import Base from "./BaseModel.js";

export default class UserModel extends Base {
    constructor(){
        super();
        this.login = this.login.bind(this)
    }
    login( params, callBack ) {
        return Base.exec( 'SELECT int_user_id FROM users WHERE st_login = $1 AND st_password = $2', [ params.st_login, params.st_password ], callBack );
    }
}