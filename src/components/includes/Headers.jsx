import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/Rick_And_Morty_(2).png";
import SeIcon from "../../assets/images/search.png";
import { useSearchParams ,createSearchParams} from "react-router-dom";
import { matchRoutes, useLocation } from "react-router-dom"

const Headers = () => {
    const routes = [{ path: "/" },{path: "/episodes"},{ path: "/:id" },{path: "/episodes/:id"}]
    const useCurrentPath = () => {
        const location = useLocation()
        const [{ route }] = matchRoutes(routes, location)
      
        return route.path
      }
    let [searchParams, setSearchParams] = useSearchParams();
    const currentPath = useCurrentPath()
    console.log(currentPath,"path----=");
    const navList = [
        {
            id: 1,
            name: "Charector",
            link: "/",
        },
        {
            id: 2,
            name: "Episodes",
            link: "/episodes",
        },
    ];
    const [active, setActive] = useState(1);
    return (
        <Cover>
            <Left>
                <a>
                    <h1>
                        <img src={Logo} alt="" />
                    </h1>
                </a>
            </Left>
            <Navbar>
                <div>
                   
                    <Dirs className={currentPath == "/"? "active" : currentPath == "/:id" ? "active" : null }
                    to="/">Charecters</Dirs>
                    <Dirs className={currentPath == "/episodes"? "active" : currentPath == "/episodes/:id" ? "active" : null }
                    to="/episodes">Episodes</Dirs>
                    
                </div>
            </Navbar>
            <Right>
                <SearchBox>
                    <Icon>
                        <img src={SeIcon} alt="search" />
                    </Icon>
                    <input type="text" placeholder="search ..." onChange={(e)=>setSearchParams(createSearchParams({q:e.target.value}))} />
                    
                </SearchBox>
            </Right>
        </Cover>
    );
};

export default Headers;
const Cover = styled.div`
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left = styled.div`
    a {
        h1 {
            width: 200px;
            img {
                width: 100%;
            }
        }
    }
`;
const Navbar = styled.div`
    div {
        display: flex;
        gap: 20px;
        position: relative;
        &:after {
            content: "";
            background: #141414;
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: -20%;
            z-index: -1;
        }
        li {
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            transition: 0.4s ease;
            &.active {
                color: red;
                font-weight: 700;
                position: relative;
                transition: 0.4s ease;

                &:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    background: red;
                    bottom: -25%;
                    left: 0;
                    border-radius: 10px;
                    transition: 0.4s ease;
                }
            }
        }
    }
`;
const Right = styled.div``;
const SearchBox = styled.div`
    width: 250px;
    height: 30px;
    background: #fff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding: 3px;
    input {
        width: 100%;
    }
`;
const Icon = styled.div`
    width: 30px;
    img {
        width: 100%;
    }
`;
const Dirs = styled(Link)`
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    transition: 0.4s ease;
    &.active {
        color: red;
        font-weight: 700;
        position: relative;
        transition: 0.4s ease;

        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            background: red;
            bottom: -25%;
            left: 0;
            border-radius: 10px;
            transition: 0.4s ease;
        }
    }
`;
