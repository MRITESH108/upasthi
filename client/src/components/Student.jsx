import React, { useState } from 'react';
import axios from 'axios';
import StatCard from '../card/StatCard';
import Input from '../card/Input';
import Button from '../card/btn';

const Student = () => {
    const url = import.meta.env.VITE_API_URL;
    const [atcode, setAtcode] = useState('');

    const handleChange = (e)=> {
        setAtcode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${url}/student/markattendance`, {code: atcode})
        .then(res => console.log(res.data));
    }

    return (
        <div style={{ padding: '20px' }}>
            <header>
                <h1>Welcome Student jii !</h1>
            </header>

            {/* Token Section */}
            <section
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgb(119, 116, 105)',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '20px',
                }}
            >
                
                <Input placeholder="Enter your Attendance Code" value={atcode} onChange={handleChange}  />
                <Button type="button" onClick={handleSubmit} label="Submit"  />
                
            </section>

            {/* Dashboard Section */}
            <div>
                {/* later optimize this section */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                    <StatCard title="Total Presentiee" value="870/1887" />
                    <StatCard title="Class Attended" value="85/87" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                    <StatCard title="Classes Missed" value="8/87" />
                    <StatCard title="Completed Task" value="200/456" />
                </div>
            </div>
        </div>
    )
}

export default Student