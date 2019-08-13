import React       from 'react';
import { Button, FormGroup, FormFeedback, Container, Row, Col, Form, Label, Input } from "reactstrap";

export const element = <Container>
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
</Container>;