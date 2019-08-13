import Base from "../utils/BaseModel.js";
import Utils from '../utils/Utils.js';

export default class BalanceModel extends Base {
    constructor(){
        super();
        Utils.bindAll( this );
    }

    balance( userId, callBack ) {
        return Base.exec( 'SELECT * FROM balance_vw WHERE int_user_id = $1', 
                            [ userId ], 
                            callBack );
    }
}