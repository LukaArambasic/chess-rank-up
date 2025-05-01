import React from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';

const AutomaticPoints = () => {
  return (
    <div className='container'>
        <TitleContainer title={"Unos bodova"} description={"Unesi bodove za određeni event"} />

        <FormControl style={{width:"90%", margin: "10px 0px"}}>
            <InputLabel id="event-label">Odaberi događaj</InputLabel>
            <Select label="Odaberi događaj" defaultValue="">
                <MenuItem value={10}>Event 1</MenuItem>
                <MenuItem value={20}>Event 2</MenuItem>
                <MenuItem value={30}>Event 3</MenuItem>
            </Select>
        </FormControl>

        <FormControl style={{width:"90%", margin: "10px 0px"}}>
            <Button variant="outlined" component="label">
                Upload file
                <input type="file" hidden />
            </Button>
        </FormControl>
      
      <Button variant="contained" color="primary" style={{width:"90%", margin: "10px 0px"}}>Submit</Button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f4ff',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto'
  },
  formControl: {
    margin: '10px 0'
  }
};

export default AutomaticPoints;
