import React         from 'react';
import ReactDOM      from 'react-dom';
import axios         from 'axios';
import { Container } from "reactstrap";
//import Login         from './user/user.view.login';
import Home          from './front/home/home.view.start';

axios.defaults.baseURL = 'http://localhost';

ReactDOM.render( 
    <Container>
        <Home/>
    </Container>
, document.getElementById('app'));
