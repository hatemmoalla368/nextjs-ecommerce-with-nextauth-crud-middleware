"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Myaccount = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();
      useEffect(() => {
        if (status === 'loading') return;
        
        if (status === 'unauthenticated' || !session) {
          router.push('/');
        }
      }, [session, status, router]);
     const [orders, setOrders] = useState([]);
   const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [formpw, setFormpw] = useState({
  current_password: "",
  password: "",
  password_confirmation: "",
});
const [message, setMessage] = useState("");
const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
const handleChangepw = (e) => {
  setFormpw({ ...formpw, [e.target.name]: e.target.value });
};
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then(setOrders)
        .catch(console.error)
        .finally(() => setLoading(false));
        fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(console.error);
    }
    
  }, [status]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setSaved(true);
          await update({
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  address: form.address,
  phoneNumber: form.phoneNumber,
}); // 🔄 Refresh session data

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
    if (status === "loading") {
  return null;
}
const handleSubmitpw = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  const res = await fetch("/api/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formpw),
  });

  const data = await res.json();
  if (!res.ok) {
    setError(data.error || "Something went wrong");
  } else {
    setMessage(data.message);
    setFormpw({ current_password: "", password: "", password_confirmation: "" });
  }
};
const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      window.location.href = "/login";
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (status === 'loading') {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (!session) {
    return null;
  }
  return (
    <main className="main">
      <div className="page-header breadcrumb-wrap">
         <div className="container">
            <div className="breadcrumb">
               <Link href="/" rel="nofollow">Home</Link>                    
               <span></span> My Account
            </div>
         </div>
      </div>
      <section className="account-container">
         <div className="container">
            <div className="row">
               <div className="col-md-12 col-lg-12 col-xl-11 m-auto">
                  <div className="row">
                     <div className="col-lg-3" id="tab-list">
                        <div className="account-menu">
                           <ul className="nav flex-column" role="tablist">
                              <li className="nav-item">
                                 <a className="nav-link active" id="dashboard-tab" data-bs-toggle="tab" href="#dashboard"
                                    role="tab" aria-controls="dashboard" aria-selected="false">
                                    <i className="fi-rs-settings-sliders mr-10"></i> Dashboard
                                 </a>
                              </li>
                              <li className="nav-item">
                                 <a className="nav-link" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab"
                                    aria-controls="orders" aria-selected="false">
                                    <i className="fi-rs-shopping-bag mr-10"></i>Orders
                                 </a>
                              </li>
                              
                              
                              <li className="nav-item">
                                 <a className="nav-link" id="account-mgt-tab" data-bs-toggle="tab" href="#account-mgt"
                                    role="tab" aria-controls="account-mgt" aria-selected="true">
                                    <i className="fi-rs-user mr-10"></i>Account Management
                                 </a>
                              </li>
                              <li className="nav-item">
                                 <button 
                  onClick={handleLogout} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    margin: 4, 
                    cursor: 'pointer',
                    color: 'gray'
                  }}
                >
                  
                
                                 <a className="nav-link" >
                                    <i className="fi-rs-sign-out mr-10"></i>Logout
                                 </a>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>

                     <div className="col-lg-9" id="tab-content">
                        <div className="tab-content dashboard-content">                                
                           
                           <div className="tab-pane fade active show" id="dashboard" role="tabpanel"
                              aria-labelledby="dashboard-tab">
                              <div className="card account-card">
                                 <div className="card-header d-flex align-items-center py-3">
                                    <h6 className="mb-0">Hello  {session.user.firstName} {session.user.lastName} </h6>
                                 </div>
                                 <div className="card-body">
                                    
                           
                                    <div className="row mt-4">
                                       <div className="col-md-6 mb-3">
                                          <div className="item-wrapper">
                                             <div className="item-header">
                                                <h6>ACCOUNT DETAILS</h6>
                                             </div>
                              
                                             <div className="item-info">
                                                <h6>{session.user.firstName} {session.user.lastName}</h6>
                                                <p className="font-sm">{session.user.email}</p>
                                             </div>
                                          </div>
                                       </div>

                                       <div className="col-md-6 mb-3">
                                          <div className="item-wrapper">
                                             <div className="item-header d-flex align-items-center justify-content-between">
                                                <h6>ADDRESS BOOK</h6>
                                                
                                             </div>
                                             
                                             <div className="item-info">
                                                <h6 className="mb-2">Your shipping address</h6>
                                                <p className="font-sm mb-0">{session.user.firstName} {session.user.lastName}</p>
                                                <p className="font-sm mb-0">{session?.user.address}</p>
                                                
                                                <p className="font-sm mb-0">{session.user.phoneNumber}</p>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           
                           <div className="tab-pane fade show" id="orders" role="tabpanel"
                              aria-labelledby="orders-tab">
                              <div className="card account-card" id="order-card">
                                 <div className="card-header d-flex align-items-center py-3">
                                    <h6 className="mb-0">Your Orders</h6>
                                 </div>
                                 
                                 <div className="acct-order-container">
                                    <div className="table-responsive">
                                        {orders.map((order) =>
                                        order.items.map((item, index) => (
                                       <div className="account-orders" key={index}>
                                          <div className="acct-order-image">
                                             <img src={item.product.images}  alt={item.product.name}/>
                                          </div>
                     
                                          <div className="acct-order-text">
                                             <h6>
                                                <Link href="#">{item.product.name}</Link>
                                             </h6>
                                             <p className="mb-1">Quantity: {item.quantity}</p>
                    <p className="mb-1">Total Price: ${(item.price * item.quantity / 100).toFixed(2)}</p>
                                             <p className="badge bg-success">{order.status}</p> <br/>
                                             <span className="text-muted font-sm">{new Date(order.createdAt).toLocaleString()}</span>
                                          </div>
                     
                                          
                                       </div>

                                       
                           ))
            )}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           
                           
                           

                           
                           <div className="tab-pane fade show" id="account-mgt" role="tabpanel" aria-labelledby="account-mgt-tab">
                              <div className="card account-card" id="order-card">
                                 <div className="card-header py-3">
                                    <h6 className="mb-0">Account Management</h6>
                                 </div>
                                 <div className="card-body px-lg-4 px-md-5">
                                    <p>Manage your account information</p>
                                    <div className="tab-custom-style">
                                       <ul className="nav nav-tabs text-uppercase">
                                          <li className="nav-item">
                                             <a className="nav-link active" id="Description-tab" data-bs-toggle="tab" href="#Description">Account Info</a>
                                          </li>
                                          <li className="nav-item">
                                             <a className="nav-link" id="Additional-info-tab" data-bs-toggle="tab" href="#Additional-info">Password</a>
                                          </li>
                                       </ul>
                                       <div className="tab-content">
                                          
                                          <div className="tab-pane fade show active" id="Description">
                                             <form className="review-form border-0 pt-0 mt-3" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    {["firstName", "lastName", "email", "address", "phoneNumber"].map((field) => (
                                                        
                                                   <div className="col-md-12" key={field}>
                                                      <div className="form-group">
                                                         <label >{field.replace(/([A-Z])/g, " $1")}</label>
                                                         <input type="text"
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="form-control" required/>
                                                      </div>
                                                   </div>
                           
                                                   
                                                   ))}

                                                   <div className="col-md-6">
                                                      <div className="form-group">
                                                         <button type="submit" className="btn mt-3" disabled={loading}>
                                                            {loading ? "Updating..." : "Update Info"}
                                                         </button>
                                                               {saved && <p className="text-success mt-2">Info updated successfully!</p>}

                                                      </div>
                                                   </div>
                                                   
                                                </div>
                                             </form>
                                          </div>
                           
                           
                                          
                                          <div className="tab-pane fade" id="Additional-info">
                                             <h6>Change your password</h6>
                                             <form className="review-form border-0 pt-2 mt-3" onSubmit={handleSubmitpw}>
                                                <div className="row">
                                                   <div className="col-md-12">
                                                      <div className="form-group">
                                                         <label >Current password *</label>
                                                         <input type="password"
                name="current_password"
                id="c-password"
                placeholder="Enter your current password"
                className="form-control"
                required
                value={formpw.current_password}
                onChange={handleChangepw}/>
                                                      </div>
                                                   </div>
                           
                                                   <div className="col-md-6">
                                                      <div className="form-group">
                                                         <label >New password *</label>
                                                         <input type="password"
                name="password"
                id="n-password"
                placeholder="Enter new password"
                className="form-control"
                required
                value={formpw.password}
                onChange={handleChangepw}/>
                                                      </div>
                                                   </div>
                           
                                                   <div className="col-md-6">
                                                      <div className="form-group">
                                                         <label >Confirm password *</label>
                                                         <input type="password"
                name="password_confirmation"
                id="cc-password"
                placeholder="Confirm new password"
                className="form-control"
                required
                value={formpw.password_confirmation}
                onChange={handleChangepw}/>
                                                      </div>
                                                   </div>
                                                    <div className="col-md-6">
            <div className="form-group">
              <button type="submit" className="btn mt-3" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </button>
              {message && (
                <p className="text-success mt-2">{message}</p>
              )}
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </div>
                                                </div>
                                             </form>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </main>
  )
}

export default Myaccount
