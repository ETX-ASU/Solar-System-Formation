import styled, { css } from 'styled-components';

export const Layout = styled.main<{
  $hasObjectBank: boolean;
  $hasGraph: boolean;
}>`
  ${({ $hasObjectBank, $hasGraph, theme: { Colors, Consts } }) => css`
    display: grid;
    grid-template-columns: ${$hasObjectBank ? '138px ' : ''}minmax(360px, 1fr)
      ${$hasGraph ? 'minmax(360px, 446px)' : ''};
    width: 100%;
    min-height: ${Consts.appMinHeight};
    background-color: ${Colors.appBackgroundColor};

    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr);
      min-height: 100vh;
    }
  `}
`;

export const LayoutTestObjects = styled.aside`
  ${({ theme: { Colors } }) => css`
    border-right: 1px solid ${Colors.defaultBorderColor};

    @media (max-width: 900px) {
      border-right: 0;
      border-bottom: 1px solid ${Colors.defaultBorderColor};
    }
  `}
`;

export const LayoutTestObjectParameters = styled.section`
  ${({ theme: { Colors } }) => css`
    display: flex;
    flex-direction: column;
    min-width: 0;
    border-right: 1px solid ${Colors.defaultBorderColor};

    @media (max-width: 900px) {
      border-right: 0;
      border-bottom: 1px solid ${Colors.defaultBorderColor};
    }
  `}
`;

export const LayoutGraph = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LayoutSectionTitle = styled.h2`
  ${({ theme: { Colors, Consts } }) => css`
    margin: 0;
    font-size: ${Consts.typographyTitleFontSize};
    font-weight: bold;
    text-align: center;
    color: ${Colors.sectionTitleTextColor};
    background-color: ${Colors.sectionTitleBackgroundColor};
    padding: 10px 20px;
  `}
`;
