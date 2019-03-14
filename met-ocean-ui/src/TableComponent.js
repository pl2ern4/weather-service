import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActionsWrapped from './TablePaginationActions'
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TableComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 8,
        };
    }

    
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentWillReceiveProps(nextProps){
    const data = [];
    Object.keys(nextProps.data).forEach((obj)=>{data.push(nextProps.data[obj])});
    this.setState({data});
    
  }
  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
            {rows.map(
                row => 
                <TableCell
                    key={row.id}
                    align={'left'}
                    padding={row.disablePadding ? 'none' : 'default'}
                >
                    {row.label}
                </TableCell>
                ,
                this,
            )}
            </TableRow>
        </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n,i) => {
                if(!n.datetime){
                    return;
                }
                return (
                  <TableRow key={'row_'+i}>
                  
                    {i%8===0 && <TableCell key={'cell_date_'+i} rowSpan="8">
                      {moment(n.datetime).utc().format('YYYY-MM-DD')}
                    </TableCell>}
                    <TableCell key={'cell_time_'+i}>
                      {moment(n.datetime).utc().format('HH:mm:ss')}
                    </TableCell>
                    <TableCell key={'cell_wave_'+i}>{n.sea_surface_wave_significant_height!=="null" &&`${n.sea_surface_wave_significant_height}m`||'--'}</TableCell>
                    <TableCell key={'cell_temp_'+i}>{`${n.air_temperature_at_2m_above_ground_level}`||'--'}</TableCell>
                    <TableCell key={'cell_directon_'+i}>{`${n.wind_from_direction_at_10m_above_ground_level}\xB0`||'--'}</TableCell>
                    <TableCell key={'cell_speed_'+i}>{`${n.wind_speed_at_10m_above_ground_level}m/s`||'--'}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage=''
                  rowSpan={8}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]} 
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}
const rows = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
    { id: 'sea_surface_wave_significant_height', numeric: false, disablePadding: false, label: 'Height from sea' },
    { id: 'air_temperature_at_2m_above_ground_level', numeric: true, disablePadding: false, label: 'Air Tempreature (Above 2m, in Kelvin) ' },
    { id: 'wind_from_direction_at_10m_above_ground_level', numeric: true, disablePadding: false, label: 'Wind Direction' },
    { id: 'wind_speed_at_10m_above_ground_level', numeric: true, disablePadding: false, label: 'Speed' },
  ];
  
TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function added(InputComponent){
    InputComponent.prototype.props = {test:1}
    return InputComponent;
}
export default added(withStyles(styles)(TableComponent));
