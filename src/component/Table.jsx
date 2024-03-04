import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'password', headerName: 'Password', width: 150 },
    ],
    []
  );

  const rows = React.useMemo(() => data.map((row, index) => ({ id: index + 1, ...row })), [data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
