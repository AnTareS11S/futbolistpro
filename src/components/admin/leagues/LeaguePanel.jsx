/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Input } from '../../ui/input';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '../../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import ModalActions from '../../ModalActions';
import { fetchLeagueDataForTable } from '../../../lib/apiUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross2Icon } from '@radix-ui/react-icons';
import { leagueFormSchema } from '../../../lib/validation/LeagueValidation';

const LeaguePanel = ({ columns }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [tableData, setTableData] = useState([]);

  const form = useForm({
    resolver: zodResolver(leagueFormSchema(false)),
    defaultValues: {
      name: '',
      bio: '',
      commissioner: '',
      country: '',
    },
    mode: 'onChange',
  });

  const fields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      name: 'country',
    },
    {
      id: 'commissioner',
      label: 'Commissioner',
      type: 'text',
      name: 'commissioner',
    },
    {
      id: 'bio',
      label: 'Bio',
      type: 'textarea',
      name: 'bio',
    },
  ];

  useEffect(() => {
    fetchLeagueDataForTable(setTableData, updateSuccess);
    setUpdateSuccess(false);
  }, [updateSuccess]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await fetch('/api/league/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      form.reset();
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Search leagues...'
            className='h-8 w-[250px] lg:w-[350px]'
            value={table.getColumn('name')?.getFilterValue() ?? ''}
            onChange={(e) =>
              table.getColumn('name').setFilterValue(e.target.value)
            }
          />

          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 pl-2'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
        <ModalActions
          label='Add'
          onSubmit={onSubmit}
          title='Add League'
          desc='Add a new league'
          form={form}
          fields={fields}
        />
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='bg-gray-200'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-gray-300'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-2'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No leagues found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-50 sm:px-6'>
          <div className='flex justify-between flex-1 sm:hidden'>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>
                Showing{' '}
                <span className='font-medium'>
                  {table.getRowModel().rows.length}
                </span>{' '}
                of <span className='font-medium'>{tableData.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav
                className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
                aria-label='Pagination'
              >
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaguePanel;