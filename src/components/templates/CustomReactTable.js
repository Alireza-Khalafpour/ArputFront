'use client'

import React, { useMemo } from 'react';
import { MaterialReactTable, createMRTColumnHelper } from 'material-react-table';
import { MRT_Localization_FA as mrtLocalizationFa } from 'material-react-table/locales/fa';
import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { AccountCircle, FileDownload, FileDownloadDone, FileDownloadOutlined, Send } from '@mui/icons-material';

const columnHelper = createMRTColumnHelper();

const CustomReactTable = () => {

  const data = [{"salary" : "9000000"}]

  const columns = useMemo(
    () => [

          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Email',
            size: 250,
          },

    ],
    [],
  );


  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };




  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      localization={mrtLocalizationFa}
      // initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            alt="avatar"
            height={200}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Signature Catch Phrase:</Typography>
            <Typography variant="h1">
              row.original.signatureCatchPhrase
            </Typography>
          </Box>
        </Box>
      )}
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
      ]}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  //export all rows, including from the next page, (still respects filtering and sorting)
                  onClick={() =>
                    handleExportRows(table.getPrePaginationRowModel().rows)
                  }
                  startIcon={<FileDownloadOutlined />}
                >
                  Export All Rows
                </Button>
                <Button
                  disabled={table.getRowModel().rows.length === 0}
                  //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                  onClick={() => handleExportRows(table.getRowModel().rows)}
                  startIcon={<FileDownloadDone />}
                >
                  Export Page Rows
                </Button>
                <Button
                  disabled={
                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                  }
                  //only export selected rows
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                  startIcon={<FileDownloadOutlined />}
                >
                  Export Selected Rows
                </Button>
          </div>
        );
      }}
    />
  );
};

export default CustomReactTable;
