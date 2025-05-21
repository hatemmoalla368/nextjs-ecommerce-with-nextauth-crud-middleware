'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordform=()=> {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const token = useSearchParams().get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError('Invalid or expired token.');
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
                              <h3>Reset password</h3>
                              {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p>Password updated! Redirecting to login...</p>}
                              <form className="contact-form pt-0 mt-20" onSubmit={handleSubmit}>
                                   {/* Updated Error Display */}
       
                                 <div className="row">
                                    
                                    <div className="col-lg-12 col-md-12">
                                       
                                       <div className="input-style mb-20">
                                           <input
                                           className="custom-input"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                                       </div>
                                    </div>

                                    

                                    <div className="col-lg-12 col-md-12 mb-30">
                                       <button type="submit" className="w-100">Reset password</button>
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
const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordform />
    </Suspense>
  );
};

export default ResetPassword;