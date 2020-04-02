import React from 'react'
import axios from 'axios'

export default class Edit extends React.Component {
    constructor(){
        super()
        this.state = {
            product_name: '',
            price: 0,
            image: ''
        }
    }
    componentDidMount(){
        this.getProduct(this.props.match.params.id)
    }
    getProduct = (id) => {
        axios.get(`/api/product/${id}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                product_name: res.data[0].product_name,
                price: res.data[0].price,                   
                image: res.data[0].image
                //res.data is an array. Grab the first of its array
            })
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    editProduct = () => {
        const {product_name, price, image} = this.state
        axios.put(`/api/products/${this.props.match.params.id}`, {product_name,price, image})
        .then(res => {
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div className='products'>
                <h2>{this.state.product_name}</h2>
                <img src={this.state.image} alt="" />
                <h3>${this.state.price}</h3>
                <input onChange={e => this.handleChange(e)} name='product_name' value={this.state.product_name}type="text" />
                <input onChange={e => this.handleChange(e)} name='price' value={this.state.price}type="text" />
                <input onChange={e => this.handleChange(e)} name='image' value={this.state.image}type="text" />
                <button onClick={() => this.props.history.push('/')}>Cancel</button>
                <button onClick={this.editProduct}>Submit Changes</button>
            </div>
        )
    }
}

