import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'; 
import TableSortLabel from '@material-ui/core/TableSortLabel'; 
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from 'moment';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

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
    Object.keys(nextProps.data).map((obj)=>{data.push(nextProps.data[obj])});
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
                row => (
                <TableCell
                    key={row.id}
                    align={'left'}
                    padding={row.disablePadding ? 'none' : 'default'}
                >
                    {row.label}
                </TableCell>
                ),
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
                  <TableRow key={n.id}>
                  
                    {i%8==0 && <TableCell rowSpan="8">
                      {moment(n.datetime).utc().format('YYYY-MM-DD')}
                    </TableCell>}
                    <TableCell>
                      {moment(n.datetime).utc().format('HH:mm:ss')}
                    </TableCell>
                    <TableCell>{n.sea_surface_wave_significant_height!=="null" &&`${n.sea_surface_wave_significant_height}m`||'--'}</TableCell>
                    <TableCell>{`${n.air_temperature_at_2m_above_ground_level}`||'--'}</TableCell>
                    <TableCell>{`${n.wind_from_direction_at_10m_above_ground_level}\xB0`||'--'}</TableCell>
                    <TableCell>{`${n.wind_speed_at_10m_above_ground_level}m/s`||'--'}</TableCell>
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
