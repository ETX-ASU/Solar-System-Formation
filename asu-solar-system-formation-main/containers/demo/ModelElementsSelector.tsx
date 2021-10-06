import * as React from 'react';
import { observer } from 'mobx-react-lite';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { MODEL_ELEMENTS_VISIBLE } from 'domainTypes';
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
  {
    name: MODEL_ELEMENTS_VISIBLE.ROCKS_AND_METALS_CONDENSE,
    label: 'Rocks and metals condense',
  },
  {
    name: MODEL_ELEMENTS_VISIBLE.HYDROGEN_COMPOUNDS_CONDENSE,
    label: 'Hydrogen compounds condense',
  },
  { name: MODEL_ELEMENTS_VISIBLE.FROST_LINE, label: 'Frost line' },
  {
    name: MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,
    label: 'Solar system planet icons and orbits',
  },
  {
    name: MODEL_ELEMENTS_VISIBLE.EXO_SYSTEM_PLANET_ICONS_AND_ORBITS,
    label: 'Exo system planet icons and orbits',
  },
];

export interface IModelElementsSelectorProps {
  onChange(value: MODEL_ELEMENTS_VISIBLE[]): void;
}

export const ModelElementsSelector = observer(
  ({ onChange }: IModelElementsSelectorProps) => {
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
          Solar system model elements
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={settingsStore.modelElements}
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
              <Checkbox checked={settingsStore.modelElements.includes(name)} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);
