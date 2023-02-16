import logo from "./logo.svg";
import "./App.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import Getusers from "./components/screens/Getusers";
import MainScreen from "./components/screens/MainScreen";
import { BrowserRouter } from "react-router-dom";

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql errors ${message}`);
        });
    }
});
const link = from([
    errorLink,
    new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MainScreen />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
