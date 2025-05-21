'use client';
import React, { useState, useMemo, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import { MaterialReactTable } from 'material-react-table';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from 'react-bootstrap';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
//import adminroleprotection from "@/hocs/adminroleprotection";

const Listproducts = ({products}) => {
     const { data: session, status } = useSession();
      const router = useRouter();
      useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
          router.push('/');
        }
      }, [session, status, router]);
     const [productsdata, setProductsdata] = useState(products);
      const [pagination, setPagination] = useState({
        pageIndex: 0, // Initial page index
        pageSize: 10, // Initial page size
      });
    
      const deleteproducts = async (productslug) => {
    
      try {
    
        const res = await fetch(`/api/products/${productslug}`, {
          method: 'DELETE',
        });
    
        if (!res.ok) {
          throw new Error(`Failed to delete product with slug ${productslug}`);
        }
    
        console.log('product deleted successfully');
    
        setProductsdata((prevproducts) =>
          prevproducts.filter((product) => product.slug !== productslug)
        );
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete the product');
      }
    };
    
    
      const columns = useMemo(
        () => [
            {
  accessorKey: "images",
  header: "Image",
  Cell: ({ cell }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <img 
        src={cell.getValue()} 
        alt="product image" 
        style={{ 
          maxWidth: "100px", 
          maxHeight: "100px",
          objectFit: "contain"
        }}
      />
    </Box>
  ),
},
          {
            accessorKey: 'name',
            header: 'The product Name',
            size: 100,
          },
          {
            accessorKey: 'description',
            header: 'description',
            size: 100,
          },
          {
            accessorKey: 'price',
            header: 'price',
            size: 100,
          },
          {
            accessorKey: 'stock',
            header: 'stock',
            size: 100,
          },
          {
      accessorKey: "category.name", // Access nested relation
      header: "Category",
      Cell: ({ cell }) => cell.getValue() || "Uncategorized"
    },
          
        {
  accessorKey: 'slug',
  header: 'Actions',
  size: 100,
  Cell: ({ cell }) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {/* Edit Button - Yellow */}
      <Link href={`/dashboard/products/updateproducts/${cell.row.original.slug}`}>
        <Button 
          variant="warning"
          style={{ 
            color: '#ffc107', 
            backgroundColor: 'transparent',
            padding: '6px',
            minWidth: '0'
          }}
        >
          <ModeEditIcon style={{ 
            color: 'inherit',
            fontSize: '3rem' // Makes icon bigger
          }} />
        </Button>
      </Link>
      
      {/* Delete Button - Red */}
      <Button
        style={{ 
          color: '#ff0000', 
          backgroundColor: 'transparent',
          padding: '6px',
          minWidth: '0'
        }}
        onClick={() => deleteproducts(cell.row.original.slug)}
      >
        <DeleteForeverIcon style={{ 
          color: 'inherit',
          fontSize: '3rem' // Makes icon bigger
        }} />
      </Button>
    </div>
  ),
}
        ],
        []
      );
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
    <div>
      
      <>
      <div className="container">
        <h1 className="text-3xl font-semibold">products list</h1>
        <Link
          href="/dashboard/products/insertproduct"
          style={{
            textDecoration: 'none',
            color: 'aqua',
            fontSize: 14,
          }}
        >
          <AddCircleOutlineIcon /> new product
        </Link>

        {/* Pass pagination state and handler to the table */}
        <MaterialReactTable
          key={productsdata.length} // Force re-render when data changes
          columns={columns}
          data={productsdata}
          initialState={{ pagination }}
          onPaginationChange={(newPagination) => {
            
            setPagination(newPagination);
          }}
          state={{ pagination: pagination }} // Ensure controlled pagination state
          manualPagination={false} // Ensure the table handles pagination internally
        />
      </div>
    </>
    </div>
  )
}

export default Listproducts
