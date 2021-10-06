import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStores } from 'providers/StoreProvider/useStores';
import { ClearGraphModal } from 'components/Modals/ClearGraphModal';

export const ClearGraphButton = observer(() => {
  const { graphStore, settingsStore } = useStores();
  const { Colors } = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReset = () => {
    graphStore.reset();
    handleClose();
  };

  return settingsStore.graphClearButtonVisible ? (
    <ClearGraphButtonWrapper>
      <StyledButton
        disabled={!settingsStore.graphClearButtonEnabled}
        onClick={handleOpen}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="redo"
          className="svg-inline--fa fa-redo fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill={
              settingsStore.graphClearButtonEnabled
                ? Colors.clearGraphButtonIconColor
                : Colors.clearGraphDisabledButtonIconColor
            }
            d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
          ></path>
        </svg>
        <span>Clear Graph</span>
      </StyledButton>
      <ClearGraphModal open={open} onClose={handleClose} reset={handleReset} />
    </ClearGraphButtonWrapper>
  ) : null;
});

const ClearGraphButtonWrapper = styled.div`
  ${({ theme: { Colors } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.clearGraphButtonWrapperBackgroundColor};
    padding: 12px;
  `}
`;

const StyledButton = styled.button`
  ${({ theme: { Colors } }) => css`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${Colors.clearGraphButtonTextColor};
    background-color: transparent;
    border: none;
    cursor: pointer;

    :disabled {
      cursor: default;
      color: ${Colors.clearGraphDisabledButtonTextColor};
    }

    svg {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
  `}
`;
