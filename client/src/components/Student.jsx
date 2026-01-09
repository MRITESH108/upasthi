import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../card/StatCard';
import Input from '../card/Input';
import Button from '../card/btn';

const Student = () => {
    const url = import.meta.env.VITE_API_URL;
    const [atcode, setAtcode] = useState('');

    const handleChange = (e) => {
        setAtcode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${url}/student/markattendance`, { code: atcode })
            .then(res => console.log(res.data));
    }

    const getweek = function () {
        const today = new Date();
        const day = today.getDay() || 7; // Sunday = 7
        const todayDate = today.getDate();

        // Monday of current week
        const monday = new Date(today);
        monday.setDate(today.getDate() - day + 1);

        const weekArray = [];

        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);

            weekArray.push({
                day: d.toLocaleString("default", { weekday: "short" }),
                date: d.getDate(),
                todayDate
            });
        }
        setWeeks(weekArray);
    }

    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        getweek();
    }, []);

    const handlecheck = () => {
        // to show full calendar
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

                <Input placeholder="Enter your Attendance Code" value={atcode} onChange={handleChange} />
                <Button type="button" onClick={handleSubmit} label="Submit" />

            </section>

            {/* calendar ui for weekly attendance  */}
            <div
                style={{
                    backgroundColor: 'rgb(119, 116, 105)',
                    display: 'flex',
                    borderRadius: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div style={{ display: 'flex', gap: '30%', marginLeft: '5%' }}>
                    {weeks.map((week, index) => {
                        const isToday = week.date === week.todayDate;
                        return (
                            <span key={index} style={{
                                borderRadius: '6px',
                                backgroundColor: isToday ? '#FFD700' : 'transparent',
                                color: isToday ? '#000' : '#fff',
                                fontWeight: isToday ? 'bold' : 'normal'
                            }}
                            >
                                {week.date}
                            </span>
                        );
                    })}
                </div>

                <Button label="show" onClick={handlecheck} />
            </div>

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

export default Student;