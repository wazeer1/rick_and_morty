import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import bg from '../../assets/images/bg.jpg'
import Headers from '../includes/Headers'
import Charecter from './Charecter'
import Episodes from './Episodes'
import EpisodeSingle from './EpisodeSingle'
import SingleCharecter from './SingleCharecter'

const MainScreen = () => {
  return (
    <Cover className="wrapper" bg={bg}>
    <Headers/>
    <Routes>
      <Route path="/" element={<Charecter/>}/>
      <Route path="/:id" element={<SingleCharecter/>}/>
      <Route path="/episodes" element={<Episodes/>}/>
      <Route path="/episodes/:id" element={<EpisodeSingle/>}/>
    </Routes>
    
    </Cover>
  )
}

export default MainScreen
const Cover = styled.div`
    height:100vh;
    // background:url(${({bg})=>bg});
    background-size:cover;
    position:relative;
    backdrop-filter:blur(3px)
`;
const Overlay = styled.div`
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    opacity:.4;
    backdrop-filter:blur(10px)
    z-index:-2;
`;