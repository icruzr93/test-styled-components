import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import appTheme from "../components/appTheme";
import GlobalStyles from "../components/GlobalStyles";
import WebsiteLayout from "../layouts/WebsiteLayout";

/**
 * Uses Styled-Components <ThemeProvider /> to provide
 * 1. Default `appTheme`
 * 2. Default `pageTheme` which overrides `appTheme`
 * 3. A `dynamicPageTheme` which can override #1 and #2 at runtime
 *
 * https://timellenberger.now.sh/blog/dynamic-theming-with-styled-components-and-nextjs
 */
export default class WebApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    dynamicPageThemes: []
  };

  /**
   * Updates the current page's theme with provided variables
   *
   * @param dynamicTheme object
   */
  updateTheme = dynamicTheme => {
    const { dynamicPageThemes } = this.state;
    const { route } = this.props.router;

    const pageIndex = dynamicPageThemes.findIndex(page => page.route === route);

    if (pageIndex === -1) dynamicPageThemes.push({ route, dynamicTheme });
    else dynamicPageThemes[pageIndex] = { route, dynamicTheme };

    this.setState({ dynamicPageThemes });
  };

  /**
   * Retrieves any dynamic theme vars for current page
   *
   * @returns object
   */
  getDynamicPageTheme = () => {
    const { route } = this.props.router;
    const { dynamicPageThemes } = this.state;
    const dynamicPageTheme = dynamicPageThemes.find(
      pageTheme => pageTheme.route === route
    );

    return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
  };

  render() {
    const { Component, pageProps } = this.props;
    const { pageTheme } = Component;
    const dynamicTheme = this.getDynamicPageTheme();

    // _app level theme variables, wrapping the entire layout
    const theme = {
      // Theme variables defined in /src/components
      ...appTheme,
      // Add any theme variables provided by the page/route level component
      ...pageTheme,
      // Override any static page variables with dynamically set variables
      ...dynamicTheme
    };

    return (
      <Container>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <WebsiteLayout>
            <Component {...pageProps} updateTheme={this.updateTheme} />
          </WebsiteLayout>
        </ThemeProvider>
      </Container>
    );
  }
}
