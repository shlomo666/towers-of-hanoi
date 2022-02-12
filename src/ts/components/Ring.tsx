import styled from 'styled-components';

export const Ring = styled.div<{
  width: number;
  height: number;
  color: string;
}>`
  background-color: ${({ color }) => color};
  min-width: ${({ width }) => `${width}px`};
  max-width: ${({ width }) => `${width}px`};
  margin: auto;
  height: ${({ height }) => `${height}px`};
  border-radius: 10px;
`;
