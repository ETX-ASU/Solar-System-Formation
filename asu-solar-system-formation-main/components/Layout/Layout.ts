import styled, { css } from 'styled-components';

export const Layout = styled.div`
  ${({ theme: { Colors, Consts } }) => css`
    display: flex;
    width: ${Consts.appMinWidth};
    height: ${Consts.appMinHeight};
    min-width: ${Consts.appMinWidth};
    min-height: ${Consts.appMinHeight};
    background-color: ${Colors.appBackgroundColor};
  `}
`;

export const LayoutTestObjects = styled.div`
  ${({ theme: { Colors } }) => css`
    width: 138px;
    border-right: 1px solid ${Colors.defaultBorderColor};
  `}
`;

export const LayoutTestObjectParameters = styled.div`
  ${({ theme: { Colors } }) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-right: 1px solid ${Colors.defaultBorderColor};
  `}
`;

export const LayoutGraph = styled.div`
  flex-basis: 446px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LayoutSectionTitle = styled.div`
  ${({ theme: { Colors, Consts } }) => css`
    font-size: ${Consts.typographyTitleFontSize};
    font-weight: bold;
    text-align: center;
    color: ${Colors.sectionTitleTextColor};
    background-color: ${Colors.sectionTitleBackgroundColor};
    padding: 10px 20px;
  `}
`;
