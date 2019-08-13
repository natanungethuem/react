export default class RouteUtils {
    static authChecker(req, res, next) {
        console.log( req.session );

        if( !!req.session.user )
            return next();
        
        return res.status( 401 ).send( 'user.login.refused' );
    }
}