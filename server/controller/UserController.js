import UserModel from '../model/UserModel.js';

export default class UserController {
    constructor() {
        this.model = new UserModel();
        this.login = this.login.bind( this );
        this.create = this.create.bind( this );
        this.edit = this.edit.bind( this );
    }

    login( request, response ) {
        this.model.login( request.body, ( d ) => {
            if( d.rows.length ) {
                let user = d.rows[ 0 ];
                request.session.user = user;
                return response.send( user );
            }

            return response.status( 401 ).send( 'user.login.refused' );
        } );
    }

    create( request, response ) {
        this.model.create( request.body, ( d, e ) => {
            if( e )
                return response.status( 400 ).send( 'user.create.error' );
            
            return response.status( 201 ).send( 'user.create.success' );
        } );
    } 

    edit( request, response ) {
        //todo
    }

}