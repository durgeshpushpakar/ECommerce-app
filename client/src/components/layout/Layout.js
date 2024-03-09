import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <meta chatSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  )
}

export default Layout;