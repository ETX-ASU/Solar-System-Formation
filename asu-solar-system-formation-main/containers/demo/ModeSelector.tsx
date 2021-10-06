import React from 'react';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';

import { MODES } from 'domainTypes';
import { useStores } from 'providers/StoreProvider/useStores';

export const ModeSelector = observer(() => {
  const { settingsStore } = useStores();
  const handleChange = (event: SelectChangeEvent) => {
    settingsStore.setMode(event.target.value as unknown as MODES);
  };

  return (
    <Box sx={{ minWidth: 200, marginRight: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color="primary">
          Mode
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={settingsStore.mode || ''}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value={MODES.PROBE}>Probe</MenuItem>
          <MenuItem value={MODES.STATE_OF_AGGREGATION}>
            State of aggregation
          </MenuItem>
          <MenuItem value={MODES.SOLAR_SYSTEM}>Solar system</MenuItem>
          <MenuItem value={MODES.FROST_LINE}>Frost line</MenuItem>
          <MenuItem value={MODES.EXOPLANETS}>Exoplanets</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});
