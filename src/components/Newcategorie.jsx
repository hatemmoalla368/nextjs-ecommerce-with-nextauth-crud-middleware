"use client" 
import React, { useEffect, useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import Col from 'react-bootstrap/Col'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import Row from 'react-bootstrap/Row'; 
import { useRouter } from "next/navigation"; 

import axios from 'axios'; 
 

import Link from 'next/link';
import { useSession } from 'next-auth/react';
const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

const Newcategorie = () => {
   const { data: session, status } = useSession();
      const router = useRouter();
      useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
          router.push('/');
        }
      }, [session, status, router]);
    
  const [slug, setSlug] = useState(""); // 👈 Add slug state

const [name, setName] = useState(""); 
const [description, setDescription] = useState(""); 


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
      const newcategorie = {
        name,
        description,
        slug
       
      };
      
      try {
        
        // Make a POST request to your API route
        const response = await fetch("/api/categories", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(newcategorie),  // Send the new book data
          
        });
  
        // After the request is successful, navigate
        if (response.ok) {
          router.push('/dashboard/categories');
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
 
 <h2 className="mb-4">Ajout category</h2> 
 
<div className="container w-100 d-flex justify-content-center"> 
<div> 
<div className='form mt-3'> 
<Row className="mb-2"> 
<Form.Group as={Col} md="6" > 
<Form.Label >the categorie name *</Form.Label> 
<Form.Control 
required 
type="text" 
placeholder="name" 
value={name} 
onChange={handleNameChange}
/> 
<Form.Control.Feedback type="invalid"> 
type the name of the categorie
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

</Row> 


</div> 
</div> 
</div> 
<div className="d-flex justify-content-between">
<Button  type="submit">Enregistrer</Button> 
<Button  type="button" className="btn btn-warning" 
as={Link} href="/dashboard/categories">Annuler</Button> 
 </div>
</Form> 
 
</div> 
</div>
  )
}

export default Newcategorie
