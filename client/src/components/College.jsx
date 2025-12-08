import React, { useState } from 'react';
import Button from '../card/btn';
import StatCard from '../card/StatCard';
import CreateStudent from '../card/CreateStudent';
import axios from 'axios';


const College = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    startSessionYear: '2025',
    dob: ''
  });

  const actions = [
    { label: "Create Admin", form: "admin" },
    { label: "Create Student", form: "student" },
    { label: "Notify Admin", form: "notifyAdmin" },
    { label: "Notify Student", form: "notifyStudent" }
  ];

  const [activeForm, setActiveForm] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const url = import.meta.env.VITE_API_URL;
  const [genCode, setgenCode] = useState('generate attendance code')

  const generCode = ()=> {
    axios.get(`${url}/college/attendancecode`).then(res => setgenCode(res.data.code))
    .catch((err)=> console.log(err));
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <header>
        <h1>Welcome Upasthi jii !</h1>
      </header>

      {/* Token Section */}
      <section
      // to change this section later with validation if todays code generated or not if not show generate code button 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(119, 116, 105)',
          borderRadius: '10px',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        <pre>{genCode}</pre>
        <button
          type="button"
          onClick={generCode}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Generate Code
        </button>
      </section>

      {/* Dashboard Section */}
      <div>
        {/* later optimize this section */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          <StatCard title="Total Presentiee" value="870/1887" />
          <StatCard title="Staff Presentiee" value="85/87" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          <StatCard title="Classes Unverified" value="8/87" />
          <StatCard title="Completed Task" value="200/456" />
        </div>
      </div>

      {/* Actions Section */}
      <div>
        {actions.map(({ label, form }) => (
          <Button
            key={label}
            label={label}
            onClick={() => setActiveForm(activeForm === form ? null : form)}
          />
        ))}
      </div>

      {activeForm === "student" && (
        <CreateStudent formData={formData} handleChange={handleChange} />
      )}
      
    </div>
  );
};

export default College;