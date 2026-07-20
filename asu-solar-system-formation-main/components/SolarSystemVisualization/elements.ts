import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  touch-action: manipulation;

  :focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: -5px;
  }
`;
