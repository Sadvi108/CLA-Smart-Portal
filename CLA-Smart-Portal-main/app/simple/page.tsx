"use client"

export default function SimplePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      color: '#000000',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Simple Test Page
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        This page uses inline styles to ensure it displays correctly.
      </p>
      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        border: '1px solid #ccc'
      }}>
        <p>✅ React is working</p>
        <p>✅ Page is rendering</p>
        <p>✅ Styles are applied</p>
      </div>
    </div>
  )
}