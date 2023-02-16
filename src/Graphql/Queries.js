import { gql } from "@apollo/client";

export const LOAD_CHARECTER = gql`
query Query {
    characters(page: 2, filter: {name: ""}) {
      info {
        count
      }
      results {
        name
      }
    }
    
  }
`