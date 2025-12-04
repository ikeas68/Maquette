import { Box, Chip, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { users } from '../data/users';

const statusColor = (status: string) => {
  switch (status) {
    case 'Actif':
      return 'success';
    case 'En attente':
      return 'warning';
    default:
      return 'error';
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nom', flex: 1, minWidth: 160 },
  { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 200 },
  { field: 'age', headerName: 'Âge', type: 'number', width: 90 },
  {
    field: 'status',
    headerName: 'Statut',
    width: 140,
    renderCell: (params) => <Chip label={params.value} color={statusColor(params.value)} size="small" />
  },
  { field: 'createdAt', headerName: 'Date création', width: 140 },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 140,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Chip size="small" label="Éditer" color="primary" clickable />
        <Chip size="small" label="Supprimer" color="error" clickable variant="outlined" />
      </Stack>
    )
  }
];

export const DataGridPage = () => (
  <Box sx={{ height: 600, width: '100%' }}>
    <Typography variant="h5" sx={{ mb: 1 }}>
      Tableau interactif
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Filtrage, tri, pagination, sélection multiple et export CSV intégrés.
    </Typography>
    <DataGrid
      rows={users}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
      slots={{ toolbar: GridToolbar }}
      density="comfortable"
      sx={{ borderRadius: 3, boxShadow: 4 }}
    />
  </Box>
);
