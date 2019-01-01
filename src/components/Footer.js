import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
        <a
          href="https://twitter.com/fabien_greard"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        <a
          href="https://www.linkedin.com/in/fabiengreard/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/FabienGreard"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://stackoverflow.com/users/6668441/fabien-greard"
          target="_blank"
          rel="noopener noreferrer"
        >
          stack overflow
        </a>
      </footer>
    );
  }
}

export default Footer;
