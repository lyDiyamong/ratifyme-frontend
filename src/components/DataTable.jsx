import React from 'react'
import DataTable from 'react-data-table-component';
import DashboardContainer from './styles/DashboardContainer';
import {columns, data} from './../data/earnerData'
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import theme from './../assets/themes/index'
import { Box } from '@mui/material';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };


const EarnerDataTable = ({props}) => {
    return (    <DashboardContainer>
                    <Box sx={{ bgcolor: theme.palette.primary.main, px:5 }}>
                        <DataTable
                            title="Movie List"
                            columns={columns}
                            data={data}
                            pagination
                            selectableRowsComponent={Checkbox}
                            selectableRowsComponentProps={selectProps}
                            sortIcon={sortIcon}
                            dense
                            {...props}
                        />
                    </Box>
                </DashboardContainer>
    )
}

export default EarnerDataTable;