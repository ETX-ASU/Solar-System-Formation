import React, { VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import ModalUnstyled from '@material-ui/unstyled/ModalUnstyled';

import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { SecondaryButton } from 'components/Buttons/SecondaryButton';

export interface IClearGraphModalProps {
  open: boolean;
  onClose: () => void;
  reset: () => void;
}

export const ClearGraphModal: VoidFunctionComponent<IClearGraphModalProps> = ({
  open,
  reset,
  onClose,
}) => {
  return (
    <StyledModal open={open} onClose={onClose} BackdropComponent={Backdrop}>
      <Wrapper>
        <Title>Are you sure?</Title>
        <Content>
          Clearing the graph removes all data from graph. You cannot undo this
          action.
        </Content>
        <Actions>
          <PrimaryButton onClick={reset}>Continue</PrimaryButton>
          <SecondaryButton onClick={onClose}>No thanks</SecondaryButton>
        </Actions>
      </Wrapper>
    </StyledModal>
  );
};

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Wrapper = styled.div`
  ${({ theme: { Colors } }) => css`
    width: 364px;
    background-color: ${Colors.modalBackgroundColor};
    color: ${Colors.modalTextColor};
    border-radius: 3px;
  `}
`;

const Actions = styled.div`
  ${({ theme: { Colors } }) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${Colors.modalActionsBackgroundColor};
    padding: 20px;
    border-radius: 0 0 3px 3px;

    > button {
      width: 100%;
    }

    button + button {
      margin-left: 10px;
    }
  `}
`;

const Title = styled.div`
  ${({ theme: { Colors } }) => css`
    font-size: 16px;
    font-weight: bold;
    background-color: ${Colors.modalTitleBackgroundColor};
    padding: 10px 20px;
    margin: 0;
    border-radius: 3px 3px 0 0;
  `}
`;

const Content = styled.div`
  font-size: 16px;
  padding: 20px;
  line-height: 28px;
`;
