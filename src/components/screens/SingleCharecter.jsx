import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SingleCharecter = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const { id } = useParams();
    console.log(id, "id-=-=-=-=-=-");
    const SINGLE_CHARECTER = gql`
        query Query {
            charactersByIds(ids: ${id}) {
                name,
                image,
                status,
                species,
                episode {
                    name,
                    air_date
                  }
            }
        }
    `;
    const { error, loading, data } = useQuery(SINGLE_CHARECTER);
    return (
        <Cover>
            {data?.charactersByIds?.map((item) => (
                <>
                    <Top>
                        <h1>{item.name}</h1>
                    </Top>
                    <Container>
                        <Left>
                            <img src={item.image} />
                        </Left>
                        <Right>
                            <h3>status:{item.status}</h3>
                            <h3>Species:{item.species}</h3>
                            <h4>episodes seen</h4>
                            <EpisodeContainer>
                            {item?.episode?.map((episode)=>(
                                <h4>episode name: {episode.name},{episode.air_date}</h4>

                            ))}
                            </EpisodeContainer>
                        </Right>
                    </Container>
                </>
            ))}
        </Cover>
    );
};

export default SingleCharecter;
const Cover = styled.div``;
const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 50px 0px;
    display: flex;
    justify-content: space-between;
`;
const Left = styled.div`
    width: 45%;
    img {
        width: 100%;
    }
`;
const Top = styled.div`
    text-align: center;
    h1 {
        color: #fff;
        font-size: 50px;
    }
`;
const Right = styled.div`
    width: 45%;
    h3{
        color:#fff;
        font-size: 34px;
    }
    h4{
        color:#fff;
        font-size: 34px;
        margin-top:30px;
    }
`;
const EpisodeContainer = styled.div`
    height:300px;
    margin-top:20px;
    overflow-y:scroll;
    h4{
        color:#fff;
        margin-bottom:30px;
        padding:10px 3px;
        cursor:pointer;
        font-size:22px;
        &:hover{
            background:#14141490;

        }
    }
`;