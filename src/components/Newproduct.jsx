"use client" 
import React, { useEffect, useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import Col from 'react-bootstrap/Col'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import Row from 'react-bootstrap/Row'; 
import { useRouter } from "next/navigation"; 
import { FilePond,registerPlugin } from 'react-filepond' 
import 'filepond/dist/filepond.min.css'; 
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview' 
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css' 

import axios from 'axios'; 
 registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview) 

import Link from 'next/link';
import { useSession } from 'next-auth/react';
const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

const Newproduct = ({categories}) => {
      const { data: session, status } = useSession();
      const router = useRouter();
      useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
          router.push('/');
        }
      }, [session, status, router]);
     const [files, setFiles] = useState([]); 

      const [slug, setSlug] = useState(""); // 👈 Add slug state
    
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [price, setPrice] = useState(0); 
    const [stock, setStock] = useState(0); 
    const [images, setImages] = useState(""); 
    const [categoryId, setCategoryId] = useState(0); 




    
    
    const [validated, setValidated] = useState(false); 
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName)); // 👈 Generate slug automatically
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
      
        // Check if the form is valid
        if (form.checkValidity() === true) {
          const newproduct = {
            name,
            description,
            slug,
            price,
            stock,
            images,
            categoryId

           
          };
          
          try {
            
            // Make a POST request to your API route
            const response = await fetch("/api/products", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              
              body: JSON.stringify(newproduct),  // Send the new book data
              
            });
      
            // After the request is successful, navigate
            if (response.ok) {
              router.push('/dashboard/products');
              router.refresh();
            } else {
              throw new Error('Failed to insert data');
            }
          } catch (error) {
            alert('Erreur ! Insertion non effectuée', error);
          }
        }
      
        setValidated(true);
        
      };

      const serverOptions = () => { console.log('server pond'); 
    return { 
      process: (fieldName, file, metadata, load, error, progress, abort) => { 
          console.log(file) 
        const data = new FormData(); 
         
        data.append('file', file); 
        data.append('upload_preset', 'espssoir2023'); 
        data.append('cloud_name', 'dlaeaf1g1'); 
        data.append('public_id', file.name); 
   
        axios.post('https://api.cloudinary.com/v1_1/dlaeaf1g1/image/upload', data) 
          .then((response) => response.data) 
          .then((data) => { 
            console.log(data); 
           setImages(data.url) ; 
            load(data); 
          }) 
          .catch((error) => { 
            console.error('Error uploading file:', error); 
            error('Upload failed'); 
            abort(); 
          }); 
      }, 
    }; 
  };
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
    <div className="container w-100 d-flex justify-content-center flex-column align-items-center">
    <div> 
     
     <Form  validated={validated} onSubmit={handleSubmit}> 
     
     <h2 className="mb-4">Ajout product</h2> 
     
    <div className="container w-100 d-flex justify-content-center"> 
    <div> 
    <div className='form mt-3'> 
    <Row className="mb-2"> 
    <Form.Group as={Col} md="6" > 
    <Form.Label >the product name *</Form.Label> 
    <Form.Control 
    required 
    type="text" 
    placeholder="name" 
    value={name} 
    onChange={handleNameChange}
    /> 
    <Form.Control.Feedback type="invalid"> 
    type the name of the product
    </Form.Control.Feedback> 
    </Form.Group> 
    <Form.Group as={Col} md="6"> 
    <Form.Label>description *</Form.Label> 
    <Form.Control 
    required 
    type="text" 
    placeholder="description" 
    value={description} 
    onChange={(e)=>setDescription(e.target.value)} 
    /> 
    <Form.Control.Feedback type="invalid"> 
     
    type DESCRIPTION
    </Form.Control.Feedback> 
    </Form.Group> 
    </Row> 
    <Row className="mb-2"> 
    <Form.Group as={Col} md="6">
            <Form.Label>Slug (auto-generated)</Form.Label>
            <Form.Control
              type="text"
              value={slug}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>price</Form.Label>
            <Form.Control
               required 
    type="number" 
    placeholder="price" 
    value={price} 
    onChange={(e)=>setPrice(e.target.value)} 
            />
          </Form.Group>
    
    </Row> 
    <Row className="mb-2"> 
    <Form.Group as={Col} md="6">
            <Form.Label>stock</Form.Label>
            <Form.Control
               required 
    type="number" 
    placeholder="stock" 
    value={stock} 
    onChange={(e)=>setStock(e.target.value)} 
            />
          </Form.Group>
          <Form.Group as={Col} md="6"> 
<Form.Label>category</Form.Label> 
<Form.Control 
as="select" 
type="select" 
value={categoryId} 
onChange={(e)=>setCategoryId(e.target.value)} 
> 
<option></option> 
{categories.map((cat)=><option key={cat.id} 
value={cat.id}>{cat.name}</option> 
)} 
</Form.Control> 
</Form.Group> 
    
    </Row> 
    <Row className="mb-2"> 
    <Form.Group as={Col} md="6"> 
<Form.Label>Image</Form.Label> 
<div style={{ width: "80%", margin: "auto", padding: "1%" }}> 
     <FilePond 
                   files={files} 
                   acceptedFileTypes="image/*" 
                   onupdatefiles={setFiles} 
                   allowMultiple={false} 
                   server={serverOptions()} 
                   name="file" 
                       
          /> 
    </div>     
</Form.Group> 
          
    
    </Row> 
    
    
    </div> 
    </div> 
    </div> 
    <div className="d-flex justify-content-between">
    <Button  type="submit">Enregistrer</Button> 
    <Button  type="button" className="btn btn-warning" 
    as={Link} href="/dashboard/products">Annuler</Button> 
     </div>
    </Form> 
     
    </div> 
    </div>
  )
}

export default Newproduct
