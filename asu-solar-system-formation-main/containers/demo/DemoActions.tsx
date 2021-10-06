import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider, createTheme } from '@material-ui/core';

import { useStores } from 'providers/StoreProvider/useStores';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ffc844',
    },
  },
});

interface IControl {
  checked: boolean;
  label: string;
  toggle: () => void;
}

export interface IGroup {
  label: string;
  controls: IControl[];
  othersComponent?: any;
}

export interface IDemoActionsProps {
  groups: IGroup[];
  Selectors: () => JSX.Element;
}

export const DemoActions = observer(
  ({ groups, Selectors }: IDemoActionsProps) => {
    const { testObjectsStore, godMode } = useStores();

    return (
      <ThemeProvider theme={muiTheme}>
        <DemoActionsWrapper>
          <Box>
            <Selectors />
            <Box mt={2}>
              Distance:{' '}
              {testObjectsStore.selectedObject?.distance == null
                ? '--'
                : `${testObjectsStore.selectedObject?.distance.toFixed(2)} AU`}
            </Box>
            <Box mt={2}>
              Angle:{' '}
              {testObjectsStore.selectedObject?.angle == null
                ? '--'
                : `${Math.round(
                    testObjectsStore.selectedObject?.angle,
                  )} Degrees`}
            </Box>
            <Box mt={2}>
              <Button variant="contained" onClick={godMode}>
                God Mode
              </Button>
            </Box>
          </Box>
          <Box>
            {groups.map((group) => (
              <FormControl
                key={group.label}
                component="fieldset"
                variant="standard"
                sx={{ marginX: 2 }}
              >
                <FormLabel component="legend">{group.label}</FormLabel>
                <FormGroup row>
                  {group.controls.map((control: IControl) => (
                    <FormControlLabel
                      key={control.label}
                      control={
                        <Switch
                          checked={control.checked}
                          onChange={control.toggle}
                        />
                      }
                      label={control.label}
                    />
                  ))}
                  {group.othersComponent}
                </FormGroup>
              </FormControl>
            ))}
          </Box>
        </DemoActionsWrapper>
      </ThemeProvider>
    );
  },
);

const DemoActionsWrapper = styled.div`
  display: flex;
  font-size: 12px;
  background-color: #2d3b4b;
  color: #e7e7e7;
  border-radius: 3px;
  margin-top: 32px;
  padding: 12px 6px 6px 6px;

  .MuiFormLabel-colorPrimary,
  #demo-simple-select-label {
    color: #ebebeb;
  }

  .MuiInputBase-input {
    color: #ebebeb;
    padding: 12px 10px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ebebeb;
  }

  & .MuiSelect-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #ffc844;
  }
`;
