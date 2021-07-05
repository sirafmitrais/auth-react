
import React from 'react';
import { 
    Container, Button, Form, FormGroup, Label, Input , Row, Col, Jumbotron
} from 'reactstrap';
import {
    Card, CardBody
} from 'reactstrap';

import instance from '../../api/AxiosInstance';
import jwt_decode from "jwt-decode";
import { Redirect, withRouter } from 'react-router-dom';

export const axios = instance.apiInstance();

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username : "merchant",
            password : "merchant",
            loggedIn : false
        }
    }

    componentDidMount() {
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value });
    }


    submitLogin = () => {
        let body = {
            username : this.state.username,
            password : this.state.password,
        }
        return axios.post('/auth/login', body)
            .then( res => {
                const response = res.data;
                const tokenData = jwt_decode(response.token);
                localStorage.setItem("expiresIn", tokenData.exp * 1000);
                localStorage.setItem("token", response.token);

                this.setState({ loggedIn: true });
            })
            .catch(function (error) {
                console.log('error', error.response);
                if (error.response.status === 400) {
                    alert(error.response.data.Message);
                }
            });
    }

    render(){
        if (this.state.loggedIn) {
            // redirect to home if signed up
            const { location } = this.props
            return <Redirect to={location?.from || '/'} />
        }
        return (
            <React.Fragment>
                <Container>
                    <Row>
                    <Col />
                    <Col lg="3">
                        <Jumbotron>
                            <h3 className="text-center" >
                                <u>Login Form</u>
                            </h3>
                            <hr />
                            <Card>
                                <CardBody>
                                    <Form>
                                        <FormGroup >
                                            <Label for="username">Username</Label>
                                            <Input 
                                                type="text" name="username" id="username"
                                                value={this.state.username}
                                                onChange={this.handleInputChange}
                                            />
                                        </FormGroup>
                                        <br/>
                                        <FormGroup >
                                            <Label for="password">Password</Label>
                                            <Input 
                                                type="text" name="password" id="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                            />
                                        </FormGroup>
                                        <br/>
                                        <Button 
                                            className="text-center" size="sm" color="success"
                                            onClick={this.submitLogin}
                                        >Login</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Jumbotron>
                    </Col>
                    <Col />
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(LoginPage)