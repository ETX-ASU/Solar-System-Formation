import * as React from 'react';
import { observer } from 'mobx-react-lite';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { OBJECT_PARAMETERS } from 'domainTypes';
import { useStores } from 'providers/StoreProvider/useStores';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  { name: OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN, label: 'Distance from sun' },
  { name: OBJECT_PARAMETERS.TEMPERATURE, label: 'Temperature' },
  { name: OBJECT_PARAMETERS.CONDENSED, label: 'Condensed' },
  { name: OBJECT_PARAMETERS.SOLID_MATERIALS, label: 'Solid Materials' },
];

export interface IParameterSelectorProps {
  onChange: (value: OBJECT_PARAMETERS[]) => void;
}

export const ParameterSelector = observer(
  ({ onChange }: IParameterSelectorProps) => {
    const { settingsStore } = useStores();

    const handleChange = (event: SelectChangeEvent<any>) => {
      const {
        target: { value },
      } = event;
      onChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          style={{ background: '#2d3b4b', paddingRight: 10 }}
        >
          Parameters Displayed
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={settingsStore.parametersDisplayed}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) =>
            names
              .filter(({ name }) => selected.includes(name))
              .map(({ label }) => label)
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          {names.map(({ name, label }) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={settingsStore.parametersDisplayed.includes(name)}
              />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);
