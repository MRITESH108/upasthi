import React from 'react'

const Textarea = ({label}) => {
  return (
    <div>
        <textarea name="" id=""
           style={{height:'12rem', width:'100%', resize:'none', backgroundColor:'black', color:'white', fontSize:'22px'}}
          >{label}</textarea>
          <button>Submit</button>
    </div>
  )
}

export default Textarea