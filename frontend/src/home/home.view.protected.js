import React       from 'react';
import HomeService from './home.view.service';
//import element     from './user.login.01.jsx';
import { Button, FormGroup, FormFeedback, Container, Row, Col, Form, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { authContext } from '../utils/route.protected';

export default class HomeProtected extends React.Component {
  constructor(props) {
    super(props);

    this.balance = {
        balance: 0
    };

    this.user = {
        name: null,
        id: null
    }

    this.service = new HomeService();
    this.service.getBalance().then( d => {
        console.log( d );
    });
  }

  render() {
    return <Container>
        <Row>
        <Col>Menu</Col>
        <Col xs="auto">
            <Row>Olá .....!</Row>
            <Row>Saldo: .....</Row>
        </Col>
        <Col></Col>
        </Row>
    </Container>;
  }
}