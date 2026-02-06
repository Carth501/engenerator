
import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runCharacterMapGen } from '../../redux/actions';
import { getCharacterMapData, getRootSeed } from '../../redux/selectors';
import './CharacterMap.css';

export function CharacterMap() {
  const dispatch = useDispatch();
  const seed = useSelector(getRootSeed);
  const characterMapData = useSelector(getCharacterMapData);
  
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [characterCount, setCharacterCount] = useState(10);

  const handleGenerate = () => {
    dispatch(runCharacterMapGen(seed, characterCount, latitude, longitude));
  };

  const handleLatitudeChange = (e) => {
    let value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      value = Math.max(-90, Math.min(90, value));
      setLatitude(parseFloat(value.toFixed(1)));
    }
  };

  const handleLongitudeChange = (e) => {
    let value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      value = ((value + 180) % 360) - 180;
      setLongitude(parseFloat(value.toFixed(1)));
    }
  };

  const handleCharacterCountChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      value = Math.max(1, Math.min(100, value));
      setCharacterCount(value);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }} className='header'>
        Bulk Character Generator
      </Typography>

      {/* Control Panel */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Latitude"
              type="number"
              value={latitude}
              onChange={handleLatitudeChange}
              inputProps={{ min: -90, max: 90, step: 0.1 }}
              fullWidth
              helperText="-90 to 90"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Longitude"
              type="number"
              value={longitude}
              onChange={handleLongitudeChange}
              inputProps={{ min: -180, max: 180, step: 0.1 }}
              fullWidth
              helperText="-180 to 180"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Character Count"
              type="number"
              value={characterCount}
              onChange={handleCharacterCountChange}
              inputProps={{ min: 1, max: 100 }}
              fullWidth
              helperText="1 to 100"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              onClick={handleGenerate}
              fullWidth
              sx={{ mt: 1 }}
            >
              Generate
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      {characterMapData && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }} className='status'>
            Generated {characterMapData.characters.length} characters at Latitude {characterMapData.location.latitude}°, Longitude {characterMapData.location.longitude}°
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell className='table-header'><strong>Name</strong></TableCell>
                  <TableCell className='table-header'><strong>Occupation</strong></TableCell>
                  <TableCell className='table-header'><strong>Personality</strong></TableCell>
                  <TableCell align="right" className='table-header'><strong>P1</strong></TableCell>
                  <TableCell align="right" className='table-header'><strong>P2</strong></TableCell>
                  <TableCell align="right" className='table-header'><strong>Wealth</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characterMapData.characters.map((character, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{character.name}</TableCell>
                    <TableCell>{character.occupation}</TableCell>
                    <TableCell>{character.personality}</TableCell>
                    <TableCell align="right">{character.p1.toFixed(3)}</TableCell>
                    <TableCell align="right">{character.p2.toFixed(3)}</TableCell>
                    <TableCell align="right">{character.wealth.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}
