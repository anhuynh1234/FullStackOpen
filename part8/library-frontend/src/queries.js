import { gql } from "@apollo/client";

export const ALL_DATA = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount
        }

        allBooks {
            title,
            published,
            author
        }
    }
`
export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook (
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title,
            author,
            published
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name,
            born
        }
    }
`