import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
padding: 15px;
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
background-color: whitesmoke;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const List = styled.ul`
text-align: right;
margin-left: auto;
margin-right: 50px;
margin-top: 0px;
margin-bottom: 0px;
`

const NavItem = styled.li`
display: inline;
list-style: none;
margin-left: 10px;
text-decoration: none;
`

const Title = styled.h1`
margin-left: 20px;
margin-bottom: 0px;
`

const StyledLink = styled(Link)`
text-decoration: none;
`

const Header = ({ currentUser, setCurrentUser } : any) => {
  return (
    <Nav>
      <Title>Keyboarding Hero</Title>
      <List>
        {currentUser !== null ? <NavItem>{currentUser.name}</NavItem> : ''}
        <NavItem><StyledLink to='/keyboard'>keyboard</StyledLink></NavItem>
        <NavItem><StyledLink to='/scoreboard'>scoreboard</StyledLink></NavItem>
        {currentUser === null ? <NavItem><StyledLink to='/login'>login</StyledLink></NavItem> : ''}
        {currentUser === null ? <NavItem><StyledLink to='/signup'>signup</StyledLink></NavItem> : ''}
        {currentUser !== null ? <NavItem onClick={() => setCurrentUser(null)}><StyledLink to='/keyboard'>logout</StyledLink></NavItem> : ''}
      </List>
    </Nav>
  );
}

export default Header;