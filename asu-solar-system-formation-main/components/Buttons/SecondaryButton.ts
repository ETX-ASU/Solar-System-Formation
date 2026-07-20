import styled, { css } from 'styled-components';
import { alpha } from '@material-ui/system';

export const SecondaryButton = styled.button`
  ${({ theme: { Colors } }) => css`
    font-size: 16px;
    font-weight: bold;
    padding: 10px 14px;
    color: ${Colors.secondaryButtonTextColor};
    background-color: transparent;
    border: 1px solid ${Colors.primaryButtonBackgroundColor};
    border-radius: 3px;
    cursor: pointer;
    min-height: 44px;

    :focus-visible {
      outline: 3px solid #ffffff;
      outline-offset: 3px;
    }

    :active {
      background-color: ${Colors.primaryButtonActiveBackgroundColor};
    }

    :hover {
      background-color: ${alpha(
        Colors.primaryButtonActiveBackgroundColor,
        0.3,
      )};
    }

    :disabled {
      background-color: ${Colors.primaryButtonDisabledBackgroundColor};
      cursor: default;
    }
  `}
`;
