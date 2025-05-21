'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address:'',
        phoneNumber:''
        
      });
       const { data: session, status } = useSession();
      const router = useRouter();
      useEffect(() => {
    // Redirect logged-in users
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [session, status, router]);
        const [error, setError] = useState('');

      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
         const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
      router.push('/login?registered=true');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };
if (status === 'loading') {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

   if (status === 'authenticated') {
    return null; // Optional: Show loading or nothing while redirecting
  }
  return (
    <div>
      <main className="main single-page">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">
                Home
              </Link>                 
              <span></span> Register
            </div>
          </div>
        </div>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-xl-7 col-lg-9 m-auto">
                <section>
                  <div className="row">
                    <div className="col-lg-7 mt-50">
                      <div className="contact-from-area">
                        <h3>Register</h3>
                        <p className="text-muted font-sm mb-3">
                          Already have an account yet? <Link  href="/login">Sign in</Link>
                        </p>
                          {error && <div className="alert alert-danger">{error}</div>}
                        

                        <form className="contact-form pt-0 mt-20" onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">First Name</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="text" 
                                  name="firstName" 
                                  placeholder="Enter your first name" 
                                  value={form.firstName} 
                                  onChange={handleChange}
                                  required 


                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">Last Name</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="text" 
                                  name="lastName" 
                                  placeholder="Enter your last name" 
                                  value={form.lastName} 
                                  onChange={handleChange}
                                  required 

                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">Adresse</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="text" 
                                  name="address" 
                                  placeholder="Enter your adresse" 
                                  value={form.address} 
                                  onChange={handleChange}
                                  required 

                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">Phone Number</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="text" 
                                  name="phoneNumber" 
                                  placeholder="Enter your last name" 
                                  value={form.phoneNumber} 
                                  onChange={handleChange}
                                  required 

                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">Email address</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="email" 
                                  name="email" 
                                  placeholder="Enter your email" 
                                  value={form.email} 
                                  onChange={handleChange}
                                  required 
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p className="font-sm">Password</p>
                              <div className="input-style mb-20">
                                <input 
                                  type="password" 
                                  name="password" 
                                  placeholder="Enter a strong password" 
                                  value={form.password} 
                                  onChange={handleChange}
                                  required 
                                />
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12 mb-30">
                              <button 
                                type="submit" 
                                className="w-100"
                                
                              >
                                SIGN UP
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> 
                    
                    {/* Rest of your component remains the same */}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

