import React       from 'react';
import UserService from './user.view.service';
//import element     from './user.login.01.jsx';
import { Button, FormGroup, FormFeedback, Container, Row, Col, Form, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";

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
    const { validate } = this.state;
    
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    
    this.setState({ validate })
  }

  submitForm(e) {

    const us = new UserService();
    us.login( this.state )
      .then( d => {
        console.log( 'Funcionou' );
        console.log( d );
        this.setState( { msg: '' } );

        const { history } = this.props;
        return history.push( '/teste' );
      } )
      .catch( d => {
        this.setState( { msg: 'Email ou senhas inválidos' } );
      }
    );

    e.preventDefault();
  }

  handleChange( event ) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit( event ) {
    event.preventDefault();
  }

  loginAlert() {
    return !!this.state.msg 
        && <Alert color="danger">{ this.state.msg }</Alert> 
  }

  render() {
    return <Container>
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
            
          { this.loginAlert() }

          <FormGroup>
            <Button onClick={this.submitForm}
                    color="success">Login</Button>
          </FormGroup>
        </Form>
      </Col>
      <Col></Col>
    </Row>
    </Container>;
  }

}