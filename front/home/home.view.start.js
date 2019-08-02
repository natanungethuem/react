import React              from "react";
import { Container }      from "reactstrap";
import Login              from '../user/user.view.login';
import { ProtectedRoute } from '../utils/route.protected';

import { Switch
       , Route
       , BrowserRouter
       , Link }        from "react-router-dom";


export default class Home extends React.Component {
    render() {
        return <Container>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login}/>

                        <ProtectedRoute path="/test2">
                            Teste 2 - Logado2
                        </ProtectedRoute>

                        <Route path="/teste">
                            Teste
                        </Route>
                    </Switch>
                </BrowserRouter>
        </Container>;
    }
}