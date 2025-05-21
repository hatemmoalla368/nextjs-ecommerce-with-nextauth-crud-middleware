'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Role = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
};

const StatusCell = ({ row, getValue, session, handleActiveChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isCurrentUser = row.original.id === session?.user.id;

  const handleChange = async (e) => {
    setIsUpdating(true);
    try {
      await handleActiveChange(row.original.id, e.target.value);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {isUpdating && (
        <span className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      )}
      <Form.Select
        value={getValue() ? 'true' : 'false'}
        onChange={handleChange}
        disabled={session?.user.role !== 'ADMIN' || isCurrentUser || isUpdating}
        size="sm"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </Form.Select>
    </div>
  );
};

const RoleCell = ({ row, getValue, session, handleRoleChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isCurrentUser = row.original.id === session?.user.id;

  const handleChange = async (e) => {
    setIsUpdating(true);
    try {
      await handleRoleChange(row.original.id, e.target.value);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {isUpdating && (
        <span className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      )}
      <Form.Select
        value={getValue()}
        onChange={handleChange}
        disabled={session?.user.role !== 'ADMIN' || isCurrentUser || isUpdating}
        size="sm"
      >
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default function AdminUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRoleChange = useCallback(async (userId, newRole) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  }, [fetchUsers]);

  const handleActiveChange = useCallback(async (userId, newStatus) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          isActive: newStatus === 'true' 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user status');
      }
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }, [fetchUsers]);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user.role === 'ADMIN') {
      fetchUsers();
    }
  }, [session, fetchUsers]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'User ID',
        cell: info => info.getValue().substring(0, 8) + '...',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => (
          <RoleCell 
            {...info} 
            session={session} 
            handleRoleChange={handleRoleChange} 
          />
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: (info) => (
          <StatusCell 
            {...info} 
            session={session} 
            handleActiveChange={handleActiveChange} 
          />
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      },
    ],
    [session, handleRoleChange, handleActiveChange]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    globalFilterFn: 'includesString',
  });

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (session?.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Management</h2>
      
      <div className="mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <span className="me-2">Show:</span>
          <Form.Select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="d-inline-block w-auto"
          >
            {[10, 20, 30, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Form.Select>
        </div>
        
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="me-2"
          >
            Previous
          </Button>
          <span className="mx-2">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <Button
            variant="outline-primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}