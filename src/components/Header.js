import React, { useEffect } from 'react'
import styled from 'styled-components'
import { selectUserphoto, selectUsername, setUserLogin, setSignOut } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { auth, provider } from '../Firebase'
import { useHistory } from 'react-router-dom'

function Header() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userName = useSelector(selectUsername)
    const userPhoto = useSelector(selectUserphoto)
    useEffect(() => {
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push('/home')
            }
        })
    }, [])

    const Signin = () =>{
        auth.signInWithPopup(provider).then((results)=>{
            let user = results.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push('/home')
        })  
    }

    const SignOut = () => {
        auth.signOut().then(()=>{
            dispatch(setSignOut)
            history.push('/')
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg"/>
            {
                !userName ?(
                    <LoginContainer>
                        <Login onClick={Signin}>Login</Login>
                    </LoginContainer>
                ) :
                <>
                    <NavMenu>
                <a>
                    <img src="/images/home-icon.svg" alt=""/>
                    <span>HOME</span>
                </a>
                <a>
                    <img src="/images/search-icon.svg" alt=""/>
                    <span>SEARCH</span>
                </a>
                <a>
                    <img src="/images/watchlist-icon.svg" alt=""/>
                    <span>WATCHLIST</span>
                </a>
                <a>
                    <img src="/images/original-icon.svg" alt=""/>
                    <span>ORIGINALS</span>
                </a>
                <a>
                    <img src="/images/movie-icon.svg" alt=""/>
                    <span>MOVIES</span>
                </a>
                <a>
                    <img src="/images/series-icon.svg" alt=""/>
                    <span>SERIES</span>
                </a>
            </NavMenu>
            <SignOute>
            <UserImage  src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={SignOut}>Sign out</span>
            </DropDown>
          </SignOute>
                </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height : 70px;
    background : #090b13;
    display : flex;
    align-items : center;
    padding : 0px 32px;
    overflowx: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    z-index: 2;
`

const Logo = styled.img`
    width : 80px;
`

const NavMenu = styled.div`
    display : flex;
    flex : 1;
    margin-left : 25px;
    align-items : center;

    a{
        display : flex;
        align-items : center;
        padding : 0 12px;
        cursor : pointer;

        img{
            height : 20px;
        }

        span{
            font-size : 13px;
            letter-spacing : 1.42px;
            position : relative;

            &:after{
                content : "";
                height : 2px;
                background : white;
                position :absolute;
                left : 0;
                right : 0;
                bottom : -6px;
                opacity : 0;
                transform-origin : left center;
                transition : all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform : scaleX(0);
            }
        }
        
        &:hover{
            span:after  {
                transform :scaleX(1);
                opacity :1;
            }
        }
        @media (max-width: 768px) {
            display: none;
    }
`
const UserImage = styled.img`
    width : 48px;
    height : 48px;
    border-radius : 50%;
    cursor : pointer;
`
const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.6)
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover{
        cursor: pointer;
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOute = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
 
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`