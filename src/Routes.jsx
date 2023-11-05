import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import ShoppingCart from "./src/components/checkout/shopping-cart/CartPage";
import CheckoutPage from "./src/components/checkout/shopping-cart/CheckoutPage";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/cart" component={ShoppingCart} />
                    <Route path="/checkout" component={CheckoutPage} />
                </Switch>
            </Router>
        )
    }
}