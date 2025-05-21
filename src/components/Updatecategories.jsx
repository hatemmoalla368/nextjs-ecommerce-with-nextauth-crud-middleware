"use client";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

const Updatecategories = ({ category }) => {
   const { data: session, status } = useSession();
      const router = useRouter();
      useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
          router.push('/');
        }
      }, [session, status, router]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [validated, setValidated] = useState(false);
  

  // ✅ Moved handleNameChange outside useEffect
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateSlug(newName)); // Auto-generate slug
  };

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setSlug(category.slug || generateSlug(category.name || ""));
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      const categoryedited = {
        name,
        description,
        slug,
      };

      try {
        // ✅ Fixed URL parsing by using absolute path
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/categories/${category.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryedited),
        });

        if (response.ok) {
          router.push('/dashboard/categories');
          router.refresh();
        } else {
          throw new Error('Failed to edit category');
        }
      } catch (error) {
        alert('Error! Category not updated');
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
      <Form validated={validated} onSubmit={handleSubmit}>
        <h2 className="mb-4">Edit Category</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div className='form mt-3'>
            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>Category Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange} // ✅ Now properly defined
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a category name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a description
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group className="col-md-6">
                <Form.Label>Slug (auto-generated)</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    value={slug}
                    readOnly
                    disabled
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Button type="submit">Save</Button>
          <Button type="button" className="btn btn-warning" as={Link} href="/dashboard/categories">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Updatecategories;