import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Container, Button } from 'reactstrap';

import instance from '../../api/AxiosInstance';
export const axios = instance.apiInstance();

class ProductPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products : []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        return axios.get('/merchant/product')
        .then(res => {
            const products = res.data.products;
            this.setState({ products });
        })
    }


    deleteProduct = (id) => {
        axios.delete(`merchant/product/${id}`)
            .then(res => {
                this.loadData();
        });        
    }

    render(){
        return (
            <React.Fragment>
                <Container>
                <br/>
                <Link to="/product/create" >
                    <Button 
                        size="sm" color="primary"
                    >Create</Button>
                </Link>
                <br/>
                <Table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Base Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td>
                                        {product.name}
                                    </td>
                                    <td>
                                        {product.description}
                                    </td>
                                    <td>
                                        {product.is_active?"Active":"Inactive"}
                                    </td>
                                    <td>
                                        {product.base_price}
                                    </td>
                                    <td>
                                        {product.stock}
                                    </td>
                                    <td>
                                        <Link to={`/product/${product._id}`} >
                                            <Button 
                                                size="sm" color="primary"
                                            >Detail</Button>
                                        </Link>
                                        <Button 
                                            size="sm" color="danger"
                                            onClick={() => this.deleteProduct(product._id)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(ProductPage)