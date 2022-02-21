import React, { Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Products from '../pages/Products';
import CartPage from '../pages/CartPage';
import PaymentSuccess from '../pages/PaymentSuccess';
import ErrorsPage from '../pages/error/ErrorsPage';

function HomeRoutes() {
  return (
    <div>
      
      <Suspense>
        <Switch>
          <Route exact path="/" component={Products}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/payment-success" component={PaymentSuccess}></Route>
          <Route component={ErrorsPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(HomeRoutes);
