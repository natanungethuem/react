import React from "react";
import { Button, FormGroup, FormFeedback, Container, Row, Col, Form, Label, Input } from "reactstrap";
import UserService from  './user.service.js';
//import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validate: { valid: false, invalid: false }
    };

    this.submitForm = this.submitForm.bind(this);
  }


  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
    
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    
    this.setState({ validate })
  }

  submitForm(e) {

    var us = new UserService();
    us.login( this.state ).then( 
      function( d ) {
        console.log( 'Funcionou' );
        console.log( d.data );
      },
      function( d ) {
        console.log( 'Deu erro' );
        console.log( d.data );
      }
    );
    e.preventDefault();
  }

  handleChange( event ) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /*handleSubmit = event => {
    event.preventDefault();
  }*/

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto">
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email"
                        name="email"
                        id="email"
                        placeholder="myemail@email.com"
                        value={ this.state.email }
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }
                        onChange={ (e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                  } }
                          ></Input>

                <FormFeedback valid>
                  Email correto!
                </FormFeedback>
                <FormFeedback invalid>
                  Email incorreto!
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">Senha</Label>
                <Input type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ (e) => {
                          this.handleChange(e)
                        } }
                        id="password"></Input>
              </FormGroup>
              <FormGroup>
                <Button onClick={this.submitForm}
                        color="success">Login</Button>
              </FormGroup>
            </Form>
          
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}