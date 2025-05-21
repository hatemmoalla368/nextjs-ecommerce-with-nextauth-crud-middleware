'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSuccess(true);
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <section>
         <div className="container">
            <div className="row">
               <div className="col-xl-7 col-lg-9 m-auto">
                  <section>
                     <div className="row">
                        <div className="col-lg-7 mt-50">
                           <div className="contact-from-area">
                              <h3>Forgot password</h3>
                              {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p>Check your email for a reset link!</p>}
                              <form className="contact-form pt-0 mt-20" onSubmit={handleSubmit}>
                                   {/* Updated Error Display */}
       
                                 <div className="row">
                                    
                                    <div className="col-lg-12 col-md-12">
                                       
                                       <div className="input-style mb-20">
                                          <input
className="custom-input"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
                                       </div>
                                    </div>

                                    

                                    <div className="col-lg-12 col-md-12 mb-30">
                                       <button type="submit" className="w-100">Sent link</button>
                                    </div>

                                    
                                 </div>
                              </form>
                           </div>
                        </div> 
                        
                        
                     </div>
                  </section>
               </div>
            </div>
         </div>
      </section>
  );
}