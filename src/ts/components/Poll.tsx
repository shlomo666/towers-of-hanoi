import styled from 'styled-components';

export const Poll = styled.div<{
  width: number;
  height: number;
}>`
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  left: ${({ width }) => `calc(50% - ${width / 2}px)`};
  background-color: red;
  z-index: -1;
  border-radius: 10px;
`;
