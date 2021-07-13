import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import db from '../Firebase';

function Details() {
    useEffect(() => {
        db.collection('movies').doc(id).get().then((doc)=>{
            if(doc.exists){
                setMovie(doc.data())
            } 
        
        })
    }, [])
    const [movie, setMovie] = useState()
    const { id } = useParams();


    return (
        <Container>
            { movie && <>
                <Background>
                    <img src={movie.backgroundImg} alt=""/>
                </Background>
                <ImgTitle>  
                    <img src={movie.titleImg} alt=""/>
                </ImgTitle>
                <Controls>
                    <PlayButton>
                        <img src="/images/play-icon-black.png" alt=""/>
                        <span>PLAY</span>
                    </PlayButton>
                    <TrailerButton>
                        <img src="/images/play-icon-white.png" alt=""/>
                        <span>Trailer</span>
                    </TrailerButton>
                    <AddButton>
                        <span>+</span>

                    </AddButton>
                    <GroupWatchButton>
                        <img src="/images/group-icon.png" alt=""/>
                    </GroupWatchButton>
                </Controls>
                <SubTitle>
                    {movie.subTitle}
                </SubTitle>
                <Description>
                    {movie.description}
                </Description>
            </>
            }
            
        </Container>
    )
}

export default Details

const Container = styled.div`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    top: 76px;
    padding: 0 calc(3.5vw + 5px);
`
const Background = styled.div`
    left: 0px;
    opacity: 0.8;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: -1;
    img {
        width: 100vw;
        height: 100vh;
        @media (max-width: 768px) {
            width: initial;
        }
    }
`
const ImgTitle = styled.div`
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    width: 100%;
    img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
    }
`

const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;
`
const PlayButton = styled.button`
    font-size: 15px;
    margin: 0px 22px 0px 0px;
    padding: 0px 24px;
    height: 56px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1.8px;
    text-align: center;
    text-transform: uppercase;
    background: rgb (249, 249, 249);
    border: none;
    color: rgb(0, 0, 0);
    img {
        width: 32px;
        }
        &:hover {
        background: rgb(198, 198, 198);
        }
        @media (max-width: 768px) {
            height: 45px;
            padding: 0px 12px;
            font-size: 12px;
            margin: 0px 10px 0px 0px;
            img {
                width: 25px;
            }
    }
`
const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
`
const AddButton = styled.button`
    width: 44px;
    margin-right: 16px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid white;
    cursor: pointer;
    
    span{
        font-size: 30px;
        color: white; 
    }
`
const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    @media (max-width: 768px) {
        font-size: 12px;
    }

`
const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    padding: 16px 0px;
    width: 75vw;
    color: rgb(249, 249, 249);
    @media (max-width: 768px) {
        font-size: 14px;
    }
`
