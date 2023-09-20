import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: '//localhost:4000',
    cache: new InMemoryCache(),
})

// const query = gql`
//     query {
//         allAuthors {
//             name,
//             born,
//             bookCount
//         }
//     }
// `

// client.query({ query })
//     .then((response) => {
//         console.log(response.data)
//     })

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)