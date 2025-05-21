"use client";
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const { data: session, status } = useSession();
        const router = useRouter();
        useEffect(() => {
      // Redirect logged-in users
      if (status === 'authenticated') {
        router.push('/');
      }
    }, [session, status, router]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
const searchParams = useSearchParams();
  const [showActivationMessage, setShowActivationMessage] = useState(false);
  
  useEffect(() => {
    // Check if redirected from successful registration
    if (searchParams.get('registered') === 'true') {
      setShowActivationMessage(true);
      
      // Clear the query parameter from URL
      router.replace('/login', undefined, { shallow: true });
    }
  }, [searchParams]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Use exact error message comparison
        if (result.error === "AccountNotActivated") {
          setError('account-not-activated'); // Use a code instead of full message
        } else {
          setError(result.error);
        }
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const res = await fetch('/api/resend-activation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Resend failed:", err);
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
               <Link href="/" rel="nofollow">Home</Link>                 
               <span></span> Login
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
                              <h3>Login</h3>
                              <p className="text-muted font-sm mb-3">
                                 Don't have an account yet? <Link href="/register">Sign up</Link>
                              </p>
                              <form className="contact-form pt-0 mt-20" onSubmit={handleSubmit}>
                                   {/* Updated Error Display */}
        {error === "account-not-activated" && (
          <div className="alert alert-warning mb-4" style={{
            background: '#fff3cd',
            padding: '1rem',
            borderLeft: '4px solid #ffc107',
            marginBottom: '1rem'
          }}>
            <p>Your account is not activated. Please check your email.</p>
            <button 
              onClick={handleResendVerification}
              disabled={!email || isLoading}
              style={{
                background: '#0d6efd',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              {resendSuccess ? "✓ Link Sent!" : "Resend Verification Email"}
            </button>
            {resendSuccess && (
              <p style={{ color: '#198754', marginTop: '0.5rem' }}>Check your inbox!</p>
            )}
          </div>
        )}
        {showActivationMessage && (
        <div className="alert alert-success mb-4">
          Registration successful! Please check your email for the activation link.
        </div>
      )}

        {error && error !== "account-not-activated" && (
          <div className="alert alert-danger mb-4" style={{
            background: '#f8d7da',
            padding: '1rem',
            borderLeft: '4px solid #dc3545',
            marginBottom: '1rem'
          }}>
            {error === "InvalidCredentials" ? 'Invalid email or password' : error}
          </div>
        )}
                                 <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                       <p className="font-sm">Email address</p>
                                       <div className="input-style mb-20">
                                          <input className="custom-input"  type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
                                       </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                       <p className="font-sm">Password <span className="float-end"><Link href="/forgot-password">Forgot Password?</Link>
</span></p>
                                       <div className="input-style mb-20">
                                          <input className="custom-input" type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
                                       </div>
                                    </div>

                                    

                                    <div className="col-lg-12 col-md-12 mb-30">
                                       <button type="submit" className="w-100">LOGIN</button>
                                    </div>

                                    
                                 </div>
                              </form>
                           </div>
                        </div> 
                        
                        <div className="col-lg-5 pl-30 contact-info d-none d-lg-block">
                           <img src="/assets/imgs/login.webp" alt="contact" />
                           <div className="mt-20">
                              <p className="text-muted font-sm">Are you having any trouble logging in to your account?</p>
                              <h6 className="mb-3">Get in touch</h6>
                              <ul>
                                 <li>
                                    <div className="icon"><i className="fas fa-phone-volume"></i></div>
                                    <div className="contact-text">+216 24021594</div>
                                 </li>
                                 <li>
                                    <div className="icon"><i className="fas fa-envelope"></i></div>
                                    <div className="contact-text">hatemmoalla368@gmail.com</div>
                                 </li>
                                 <li>
                                    <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                                    <div className="contact-text">route manzel chaker klm 5.5</div>
                                 </li>
                              </ul>
                              <div className="mobile-social-icon mt-20">
                                 <p className="text-muted font-sm">Follow us on social media</p>
                                 <Link href="/" className="fb"><img src="/assets/imgs/theme/icons/icon-facebook-white.svg" alt="icons" /></Link>
                                 <Link href="/" className="twit"><img src="/assets/imgs/theme/icons/icon-twitter-white.svg" alt="icons" /></Link>
                                 <Link href="/" className="insta"><img src="/assets/imgs/theme/icons/icon-instagram-white.svg" alt="icons" /></Link>
                                 <Link href="/" className="pin"><img src="/assets/imgs/theme/icons/icon-pinterest-white.svg" alt="icons" /></Link>
                                 <Link href="/" className="utube"><img src="/assets/imgs/theme/icons/icon-youtube-white.svg" alt="icons" /></Link>
                              </div>
                           </div>
                        </div>
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

export default Login;