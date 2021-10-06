import React from 'react';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';

import { useStores } from 'providers/StoreProvider/useStores';

export const ObjectSelector = observer(() => {
  const { testObjectsStore } = useStores();
  const handleChange = (event: SelectChangeEvent) => {
    const objectToSelect = testObjectsStore.objects.find(
      (object) => object.id === event.target.value,
    );
    testObjectsStore.toggleSelection(objectToSelect!);
  };

  return (
    <Box sx={{ minWidth: 200, marginRight: 2, marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-selected-object-label" color="primary">
          Selected Object
        </InputLabel>
        <Select
          labelId="demo-selected-object-label"
          id="demo-selected-object"
          value={testObjectsStore.selectedObject?.id || ''}
          label="Selected Object"
          onChange={handleChange}
        >
          {testObjectsStore.objects.map((object) => (
            <MenuItem key={object.id} value={object.id}>
              {object.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});
