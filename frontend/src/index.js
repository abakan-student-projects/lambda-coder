import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

require('dotenv').config();

const client = new ApolloClient({
    link: createHttpLink({
        uri: process.env.REACT_APP_GRAPHQL_URL,
        credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <BrowserRouter>
                <Header/>
                <Content/>
                <Footer/>
            </BrowserRouter>
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
