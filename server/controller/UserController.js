import UserModel from '../model/UserModel.js';

export default class UserController {
    constructor() {
        this.model = new UserModel();
        this.login = this.login.bind( this );
    }

    login( request, response ) {
        this.model.login( request.body, ( d ) => {
            if( d.rows.lenght )
                return response.send( d.rows[ 0 ] );
            
            return response.status( 401 ).send( 'user.login.refused' );
        } );
    }
}