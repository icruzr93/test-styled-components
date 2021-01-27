import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "nice-color-palettes/200";

/**
 * Picks a random top color palette from https://www.colourlovers.com/
 * to generate a page theme.
 *
 * https://github.com/Jam3/nice-color-palettes
 */
const generateColorPalette = () => {
  const [
    fontColor,
    fontHoverColor,
    pageBackgroundColor,
    headerBackgroundColor
  ] = colors[Math.floor(Math.random() * Math.floor(colors.length))];

  return {
    headerFontColor: fontColor,
    headerBackgroundColor,
    pageBackgroundColor,
    pageFontColor: fontColor,
    pageFontHoverColor: fontHoverColor
  };
};

const Page = ({ updateTheme }) => (
  <StyledPage>
    <Heading>Select a color to update the theme</Heading>
    <ButtonContainer>
      <Button onClick={() => updateTheme(generateColorPalette())}>
        random
      </Button>
      <Button
        onClick={() =>
          updateTheme({
            headerFontColor: "black",
            headerBackgroundColor: "grey",
            pageBackgroundColor: "purple",
            pageFontColor: "black",
            pageFontHoverColor: "red"
          })
        }
      >
        purple
      </Button>
      <Button onClick={() => updateTheme({})}>reset</Button>
    </ButtonContainer>
  </StyledPage>
);

Page.propTypes = {
  updateTheme: PropTypes.func.isRequired
};

// Override default app theme for this page
Page.pageTheme = {
  headerFontColor: "black",
  headerBackgroundColor: "purple",
  pageBackgroundColor: "grey",
  pageFontColor: "black"
};

export default Page;

const StyledPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.pageBackgroundColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.pageFontColor};
  padding: 2em 0;
`;

const Button = styled.button`
  outline: none;
  line-height: 2.5em;
  font-size: 17px;
  padding: 0 10px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.pageFontColor};
  color: ${({ theme }) => theme.pageFontColor};
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  :hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.pageFontHoverColor};
    color: ${({ theme }) => theme.pageFontHoverColor};
  }
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.pageFontColor};
`;
