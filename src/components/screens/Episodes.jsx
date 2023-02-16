import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
// import { LOAD_CHARECTER } from "../../Graphql/Queries";

const Episodes = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [pageCount, setPageCount] = useState(0);
    const [pagenumber, setPageNumber] = useState(1);
    const [modal,setModal]=useState(false)
    const s = searchParams.get("q");
    const handlePageClick = (event) => {
        console.log( event.selected + 1,"hello world");
        setPageNumber(event.selected + 1)
    };
    const q = s ? String(s): "";
    const LOAD_EPISODES = gql`
    query Query {
      episodes(page: ${pagenumber}, filter: { name: \"${q}"}) {
        info {
          count,
    
        },
        results {
          name,
          id,
          characters {
            name,
            species
          }
        }
    
      }
    }
    `;
    console.log(q);
    const { error, loading, data } = useQuery(LOAD_EPISODES);
    useEffect(()=>{
        setPageCount(data?.episodes?.info?.count / 20)
    },[data])
    console.log(error, data, loading);
    return (
        <>
        <FilterSection>
            <FilterButton onClick={()=>setModal((prev)=>!prev)}>Filter</FilterButton>
            <FilterModal modal={modal}>
                <ContentCover><p>Status</p></ContentCover>
            </FilterModal>
            </FilterSection>
        <Cover>
            {data?.episodes?.results?.map((item) => (
               <Link to={"/episodes/"+item.id}> <Widget bg={item.image}>{item.name}</Widget></Link>
            ))}
            
        </Cover>

        <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagin"
            />
            </>
    );
};

export default Episodes;
const Cover = styled.div`
    /* display:flex; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 40px;
    overflow-y: scroll;
    height: 600px;
    margin-bottom: 30px;
    /* grid-template-rows: 1fr 1fr 1fr; */
`;
const Widget = styled.div`
    /* width:30%; */
    height: 250px;
    background: #00000090;
    gap: 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    cursor: pointer;
    font-weight: 700;
    color: #fff;
    background-image: url(${({ bg }) => bg});
    background-size: contain;
`;
const FilterSection = styled.div`
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    position: relative;
    // background-color: aquamarine;
`;
const FilterButton = styled.div`
    width:100px;
    height: 35px;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000090;
    border-radius: 10px;
    cursor:pointer;
    // float:right;
`;
const FilterModal = styled.div`
    width:200px;
    height:300px;
    background-color: #141414;
    position: absolute;
    padding: 20px;
    z-index: 10;
    top: 75%;
    transform: ${({modal})=>modal ? 'scale(1)' : 'scale(0)'};
    transition: .4s ease;
    transform-origin: top right;

`;
const ContentCover = styled.div`
    p{
        color:#fff;
    }
`;