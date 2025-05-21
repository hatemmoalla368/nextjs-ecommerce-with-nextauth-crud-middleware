// components/JQueryInitializer.jsx
'use client';
import { useEffect } from 'react';

export default function JQueryInitializer() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Initialize jQuery
      window.$ = window.jQuery = require('jquery');
      
      // Initialize jQuery UI with all dependencies
      require('jquery-ui-dist/jquery-ui');
      
      // Import CSS
      import('jquery-ui-dist/jquery-ui.css');
    }
  }, []);

  return null;
}