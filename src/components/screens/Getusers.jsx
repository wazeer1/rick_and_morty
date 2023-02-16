import React, { useEffect } from 'react'
import {useQuery,gql} from "@apollo/client"
import {LOAD_CHARECTER} from '../../Graphql/Queries'

const Getusers = () => {
    const {error, loading, data} = useQuery(LOAD_CHARECTER)
    useEffect(()=>{
        console.log(data);
    },[data])
  return (
    <div>

    </div>
  )
}

export default Getusers