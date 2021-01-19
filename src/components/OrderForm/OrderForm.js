// Add functionality to allow submission of the form when there is at least once ingredient,
//  and a name added to the order. If one of these two things is missing,
//   you should not be able to submit an order. If the order is submitted, 
//   a POST request should be made to the server.

// New orders should only be displayed on the page IF the POST request is successful. 
// On refresh, the new order should persist on the page. 
// (You shouldn't need to refresh the page to see the new order, though.)


import React, { Component } from 'react';
import { postOrders } from '../../apiCalls';
import './OrderForm.scss'

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  //if the name and ingredients have value allow the user to submit 
  //else window alert 
  checkInputs = () => {
    if(this.state.name !== '' && this.state.ingredients !== []) {
      return true
    } else {
      window.alert('You need to select at least one ingredient to place an order! ')
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }


//when the user clicks an ingredient it should be added to the ingredients array 
  handleIngredientChange = (e) => {
    e.preventDefault()
    const ingredient = e.target.name
    let oldIngredients = [...this.state.ingredients]
    oldIngredients.push(ingredient)
    this.setState({ingredients: oldIngredients})
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const hasValue = this.checkInputs()
    const order = this.state
    if (hasValue) {
      postOrders(order)
      this.props.addOrder(order)
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button 
          key={ingredient} 
          name={ingredient} 
          onClick={e => this.handleIngredientChange(e)}
          className="ingred-btn">
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
