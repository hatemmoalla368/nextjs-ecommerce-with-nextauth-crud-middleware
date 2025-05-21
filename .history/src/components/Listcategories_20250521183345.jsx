'use client';
import React, { useState, useMemo, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import { MaterialReactTable } from 'material-react-table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
//import adminroleprotection from "@/hocs/adminroleprotection";

const Listcategories = ({categories}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (status === 'loading') return;
      
      if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
        router.push('/');
      }
    }, [session, status, router]);
  
     const [categoriesdata, setCategoriessdata] = useState(categories);
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Initial page index
    pageSize: 10, // Initial page size
  });

  
  
    

  const deletecategory = async (categoryslug) => {

  try {

    const res = await fetch(`/api/categories/${categoryslug}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete category with slug ${categoryslug}`);
    }


    setCategoriessdata((prevcategories) =>
      prevcategories.filter((category) => category.slug !== categoryslug)
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    alert('Failed to delete the category');
  }
};


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'The categorie Name',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: 'description',
        size: 100,
      },
      
       {
  accessorKey: 'slug',
  header: 'Actions',
  size: 100,
  Cell: ({ cell }) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {/* Edit Button - Yellow */}
      <Link href={`/dashboard/categories/updatecategories/${cell.row.original.slug}`}>
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
        onClick={() => deletecategory(cell.row.original.slug)}
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
        <h1 className="text-3xl font-semibold">categories list</h1>
        <Link
          href="/dashboard/categories/insertcategorie"
          style={{
            textDecoration: 'none',
            color: 'aqua',
            fontSize: 14,
          }}
        >
          <AddCircleOutlineIcon /> new category
        </Link>

        {/* Pass pagination state and handler to the table */}
        <MaterialReactTable
          key={categoriesdata.length} // Force re-render when data changes
          columns={columns}
          data={categoriesdata}
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

export default Listcategories
