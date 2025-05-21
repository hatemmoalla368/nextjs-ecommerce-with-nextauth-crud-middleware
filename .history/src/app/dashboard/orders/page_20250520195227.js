'use client';
import { useState, useEffect, useMemo } from 'react';
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

const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export default function AdminOrders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user.role === 'ADMIN') {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/allorders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/allorders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order ID',
        cell: info => info.getValue().substring(0, 8) + '...',
      },
      {
        accessorKey: 'user.email',
        header: 'Customer Email',
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: info => `$${info.getValue()}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row, getValue }) => (
          <Form.Select
            value={getValue()}
            onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
            disabled={session?.user.role !== 'ADMIN'}
          >
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant="info"
            size="sm"
            onClick={() => {
              setSelectedOrder(row.original);
              setShowModal(true);
            }}
          >
            View Items
          </Button>
        ),
      },
    ],
    [session]
  );

  const table = useReactTable({
    data: orders,
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
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (session?.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Management</h2>
      
      {/* Global Search Only */}
      <div className="mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search orders..."
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

      {/* Pagination remains the same */}
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

      {/* Order details modal remains the same */}
         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Order #{selectedOrder?.id?.substring(0, 8)}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedOrder && (
      <>
        <div className="mb-4">
          <h5>Customer Information</h5>
          <p><strong>Name:</strong> {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
          <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
                    <p><strong>Address:</strong> {selectedOrder.user?.address}</p>
          <p><strong>PhoneNumber:</strong> {selectedOrder.user?.phoneNumber}</p>

          <p><strong>Order Total:</strong> ${selectedOrder.total}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
        </div>

        <h5 className="mb-3">Order Items</h5>
        {selectedOrder.items?.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product?.name || 'N/A'}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No items found in this order</p>
        )}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}