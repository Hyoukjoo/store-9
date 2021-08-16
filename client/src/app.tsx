import React from 'react';
import styled from '@emotion/styled';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import ButtonToMoveToTop from '@/components/base/ButtonToMoveToTop';
import LoginPage from '@/pages/Login';
import SignupMethod from '@/pages/SignupMethod';
import Main from '@/pages/Main';
import ProductList from '@/pages/ProductList';
import CartPage from '@/pages/Cart';
import Order from '@/pages/Order';
import NotFound from '@/pages/NotFound';

import '@/static/assets/img/baeminFavicon.png';

/**
 * FIXME:
 * 추후 여러 경로가 동일 컴포넌트 가리키는 것에 대한 처리 필요
 */
const App = () => {
  return (
    <PageContainer>
      <Router>
        <Header />
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/order">
          <Order />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/signupMethod">
          <SignupMethod />
        </Route>
        <Route exact path="/total">
          <ProductList />
        </Route>
        <Route exact path="/suplies">
          <ProductList />
        </Route>
        <Route exact path="/living">
          <ProductList />
        </Route>
        <Route exact path="/books">
          <ProductList />
        </Route>
        <Route exact path="/green">
          <ProductList />
        </Route>
        <Route exact path="/smile-edition">
          <ProductList />
        </Route>
        <Route exact path="/euljiro-edition">
          <ProductList />
        </Route>
        <Route exact path="/baedal-friends">
          <ProductList />
        </Route>
        <Route exact path="/present">
          <ProductList />
        </Route>
        <Route exact path="/collaborate">
          <ProductList />
        </Route>
        <Route exact path="/notfound">
          <NotFound />
        </Route>
      </Router>
      <ButtonToMoveToTop />
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-width: 1450px;
`;

const ProductPage = () => {
  return <div>This is Product Page</div>;
};

export default App;
