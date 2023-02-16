import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const EpisodeSingle = () => {
    const { id } = useParams();
    console.log(id, "id-=-=-=-=-=-");
    const [hoverId, setHoverId] = useState();
    const SINGLE_EPISODES = gql`
    query Query {
        episodesByIds(ids: ${id}) {
            name,
            air_date,
            
            characters {
              name,
              image,
              id,
              status
            }
          }
      }
    `;
    const { error, loading, data } = useQuery(SINGLE_EPISODES);
    console.log(data);
    return (
        <Cover>
            {data?.episodesByIds?.map((item) => (
                <Container>
                    <Top>
                        <h3>{item.name}</h3>
                        <h4>{item.air_date}</h4>
                    </Top>
                    <CharecterContainer>
                        {item.characters?.map((charecter) => (
                            <Widget
                                bg={charecter.image}
                                onMouseOver={() => setHoverId(charecter.id)}
                                onMouseOut={() => setHoverId("")}
                            >
                                <Overlay
                                    className={
                                        hoverId == charecter.id
                                            ? "active"
                                            : null
                                    }
                                >
                                <h5>{charecter.name}</h5>
                                <h5>{charecter.status}</h5>
                                </Overlay>
                            </Widget>
                        ))}
                    </CharecterContainer>
                </Container>
            ))}
        </Cover>
    );
};

export default EpisodeSingle;
const Cover = styled.div`
    width: 70%;
    margin: 0 auto;
`;
const Container = styled.div``;
const Top = styled.div`
    text-align: center;
    h3 {
        text-align: center;
        font-size: 40px;
        color: #fff;
    }
    h4 {
        color: #fff;
    }
`;
const CharecterContainer = styled.div`
    display: grid;
    margin-top: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 40px;
    max-height: 650px;
    overflow: scroll;
`;
const Widget = styled.div`
    height: 150px;
    background-image: url(${({ bg }) => bg});
    background-size: cover;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;
const Overlay = styled.div`
    width: 100%;
    height: 0px;
    background: #14141490;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.4s ease;
    h5{
        font-size:18px;
        color:#fff;
    }
    &.active {
        height: 70px;
        transition: 0.4s ease;
    }
`;
