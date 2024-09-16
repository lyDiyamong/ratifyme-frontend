// React library import
import React from 'react'
import DataTable from 'react-data-table-component';

// MUI import
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { Box } from '@mui/material';

// Custom import
import DashboardContainer from './styles/DashboardContainer';
import {columns, data} from './../data/earnerData'
import theme from './../assets/themes/index'

// <!-- ============ React DataTable component ============ -->
const customStyle =  {
    headCells: {
            style: {
                color: '#202124',
                fontSize: '19px',
            },
	},
}


// <!-- ============ React DataTable component ============ -->
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const EarnerDataTable = ({props}) => {
    return (    <DashboardContainer>
                    <Box sx={{  boxShadow: theme.customShadows.default,
                                borderRadius: theme.customShape.section,
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: theme.palette.customColors.white,
                    }}>
                        <Box sx={{ px:5, py:2 }}>
                            <DataTable
                            // start DataTable Confiq
                                title="Earner List"
                                columns={columns}
                                data={data}
                                pagination
                                selectableRowsComponent={Checkbox}
                                selectableRowsComponentProps={selectProps}
                                sortIcon={sortIcon}
                                dense
                                customStyles={customStyle}
                                {...props}
                            />
                        </Box>
                    </Box>
                </DashboardContainer>
    )
}
// <!-- ============ React DataTable component ============ -->
export default EarnerDataTable;