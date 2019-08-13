export default class Utils {
    static bindAll( obj ) {
        //Bind all
        for (let key in obj ){
            if( typeof obj[key] == 'function' ) 
                obj[ key ] = obj[ key ].bind( obj );}
    }
}
