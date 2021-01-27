import styled from "styled-components";

const Header = () => <StyledHeader>I'm a header</StyledHeader>;

export default Header;

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.headerFontColor};
  background-color: ${({ theme }) => theme.headerBackgroundColor};
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
`;
