import React, { useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import styled, { keyframes, css } from 'styled-components';

import useMouseCoords from '../../utils/useMouseCoords';
import hexToRgb from '../../utils/hexToRgb';

import { MouseHoverContext, MouseHoverProvider } from './MouseHoverContext';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99999;
`;

const AnimatedContainer = animated(Container);

const selectColor = props =>
  props.theme.colors[props.color] || props.theme.colors.pink;

const Pointer = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${selectColor};
`;

const pulse = color => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${hexToRgb(color).toString()}, 0.4);
  }
  70% {
      box-shadow: 0 0 0 15px rgba(${hexToRgb(color).toString()}, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(${hexToRgb(color).toString()}, 0);
  }
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${selectColor};
  ${props =>
    props.isAnimated &&
    css`
      animation: ${props => pulse(selectColor(props))} 1s infinite;
    `}
`;

const AnimatedCircle = animated(Circle);

const Cursor = ({ color }) => {
  const { x, y } = useMouseCoords();
  const { isHover } = useContext(MouseHoverContext);

  useEffect(() => {
    window.document.body.style.setProperty('cursor', 'none', 'important');
  }, []);

  const isXYInViewport = useMemo(() => {
    const offset = 0.99;

    if (
      x >= window.innerWidth * offset ||
      x <= window.innerWidth * (1 - offset)
    ) {
      return 0;
    }

    if (
      y >= window.innerHeight * offset ||
      y <= window.innerHeight * (1 - offset)
    ) {
      return 0;
    }

    return 1;
  }, [x, y]);

  const { xy, opacity } = useSpring({
    xy: [x, y],
    opacity: isXYInViewport,
    config: config.stiff,
  });

  const followTranslate = (x, y) =>
    `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

  return (
    <AnimatedContainer style={{ opacity }}>
      <Pointer
        color={color}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0) translate3d(-50%, 50%, 0)`,
        }}
      />
      <AnimatedCircle
        color={color}
        isAnimated={isHover}
        style={{
          transform: xy.interpolate(followTranslate),
        }}
      />
    </AnimatedContainer>
  );
};

Cursor.defaultProps = {
  color: 'pink',
};

Cursor.propTypes = {
  color: PropTypes.oneOf(['white', 'green', 'yellow', 'pink', 'blue']),
};

export default Cursor;
export { MouseHoverContext, MouseHoverProvider };