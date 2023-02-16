import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
// import { LOAD_CHARECTER } from "../../Graphql/Queries";

const Charecter = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [pageCount, setPageCount] = useState(0);
    const [pagenumber, setPageNumber] = useState(1);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState("");
    const [species,setSpecies] = useState("")
    const s = searchParams.get("q");
    const handlePageClick = (event) => {
        console.log(event.selected + 1, "hello world");
        setPageNumber(event.selected + 1);
    };
    const q = s ? String(s) : "";
    const LOAD_CHARECTER = gql`
        query Query {
            characters(page: ${pagenumber}, filter: { name: \"${q}" , status: \"${status}" , species:\"${species}"}) {
                info {
                    count
                }
                results {
                    name,
                    image,
                    id,
                    status,
                    gender,
                    species
                }
            }
        }
    `;
    console.log(q);
    const { error, loading, data } = useQuery(LOAD_CHARECTER);
    useEffect(() => {
        setPageCount(data?.characters?.info?.count / 20);
    }, [data]);
    console.log(status);
    return (
        <>
            <FilterSection>
                <FilterButton onClick={() => setModal((prev) => !prev)}>
                    Filter
                </FilterButton>
                <FilterModal modal={modal}>
                    <ContentCover>
                        <p>Status</p>
                        <StatusSection>
                            <label>Alive</label>
                            <input
                                type="radio"
                                name="status"
                                value="alive"
                                onClick={(e) => setStatus(e.target.value)}
                            />
                            <label>Dead</label>
                            <input
                                type="radio"
                                name="status"
                                value="dead"
                                onClick={(e) => setStatus(e.target.value)}
                            />
                        </StatusSection>
                        <SpeciesSection>
                        <p>Species</p>
                        <label>Human</label>
                            <input
                                type="radio"
                                name="species"
                                value="human"
                                onClick={(e) => setSpecies(e.target.value)}
                            />
                            <label>Alien</label>
                            <input
                                type="radio"
                                name="species"
                                value="alien"
                                onClick={(e) => setSpecies(e.target.value)}
                            />
                        </SpeciesSection>
                    </ContentCover>
                </FilterModal>
            </FilterSection>
            <Cover>
                {data?.characters?.results?.map((item) => (
                    <Link to={"/" + item.id}>
                        {" "}
                        <Widget bg={item.image}>{item.name}</Widget>
                    </Link>
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

export default Charecter;
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
    width: 100px;
    height: 35px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000090;
    border-radius: 10px;
    cursor: pointer;
    // float:right;
`;
const FilterModal = styled.div`
    width: 200px;
    height: 200px;
    background-color: #141414;
    position: absolute;
    padding: 20px;
    z-index: 10;
    top: 75%;
    transform: ${({ modal }) => (modal ? "scale(1)" : "scale(0)")};
    transition: 0.4s ease;
    transform-origin: top right;
`;
const ContentCover = styled.div`
    p {
        color: #fff;
        margin-bottom: 15px;
    }
    label {
        color: #fff;
    }
    input {
        margin-right: 20px;
    }
`;
const StatusSection = styled.div``;
const SpeciesSection = styled.div`
    margin-top: 40px;
`;