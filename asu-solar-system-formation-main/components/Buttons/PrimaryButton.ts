import styled, { css } from 'styled-components';

export const PrimaryButton = styled.button`
  ${({ theme: { Colors } }) => css`
    font-size: 16px;
    font-weight: bold;
    padding: 10px 14px;
    color: ${Colors.primaryButtonTextColor};
    background-color: ${Colors.primaryButtonBackgroundColor};
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

    :disabled {
      background-color: ${Colors.primaryButtonDisabledBackgroundColor};
      border: 1px solid ${Colors.primaryButtonDisabledBackgroundColor};
      cursor: default;
    }
  `}
`;
