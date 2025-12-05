import React from 'react'

const StatCard = ({ title, value }) => {
  return (
    <div style={{ padding: '10px', textAlign: 'center', minWidth: '120px' }}>
    <h4>{title}</h4>
    <pre>{value}</pre>
  </div>
  )
}

export default StatCard