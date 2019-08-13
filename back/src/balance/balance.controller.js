import BalanceModel from './balance.model';
import Utils from '../utils/Utils.js';

export default class BalanceController {
    constructor() {
        this.model = new BalanceModel();
        this.balance = this.balance.bind( this );
    }

    balance( request, response ) {
        console.log( request.session );
        this.model.balance( request.session.cookie.user, ( d ) => {
            if( d.rows.length ) {
                let balance = d.rows[ 0 ];
                console.log( balance );
                return response.send( 'Ok' );
            }

            return response.status( 404 ).send( 'user.notFound' );
        } );
    }
}