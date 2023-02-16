import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment/moment';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row._id}
        </TableCell>
        <TableCell align="right">{row.cityid}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.state}</TableCell>
        <TableCell align="right">{row.probabilityofprecip}</TableCell>
        <TableCell align="right">{moment(row.lastreporttime).format('YYYY/MM/DD')}</TableCell>
        <TableCell align="right">{row.probabilityofprecip >= 60 && row.relativehumidity >= 50 ? 'SI LLUEVE' : 'NO LLUEVE'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                    {Object.keys(row).map( name =>
                      <TableCell>{name}</TableCell>
                    )}
                    </TableRow>                
                </TableHead>
                <TableBody>
                    <TableRow>
                        {Object.values(row).map( name =>
                            <TableCell style={{textAlign: 'center'}}>{name}</TableCell>
                        )}
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cityid: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    probabilityofprecip: PropTypes.string.isRequired,
  }).isRequired,
};


export default function CollapsibleTable( props ) {
    const { dataTable } = props;
    const isEmmpty = Object.keys( dataTable ).length === 0;
    debugger
    console.log(dataTable.results);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>_id</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right" >City ID</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">Name</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">State</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">Probability of Precip</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">Last Report Time</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">Llueve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { !isEmmpty ? dataTable.results.map((row) => (
            <Row key={row.name} row={row} />
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}