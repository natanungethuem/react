export default class Utils {
    static bindAll( obj ) {
        //Bind all
        console.log( obj );
        for (let key in obj ){
            console.log( key );
            if( typeof obj[key] == 'function' ) 
                obj[ key ] = obj[ key ].bind( obj );}
    }
}
