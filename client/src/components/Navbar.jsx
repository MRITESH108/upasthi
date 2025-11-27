import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hoverIndex, setHoverIndex] = useState(null);

    const navItems = [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Service", path: "/service" },
        { title: "Projects", path: "/projects" },
        { title: "Blogs", path: "/blogs" },
        { title: "Login", path: "/login" },
        { title: "SignUp", path: "/signup" }
    ];

    const filteredItems = location.pathname === "/"
        ? navItems.filter(item => item.title !== "Home")
        : navItems;

    return (
        <div
            style={{
                display: 'flex',
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5%',
                margin: '15px',
                height: '50px'
            }}
        >
            {filteredItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isHover = hoverIndex === index;

                return (
                    <div
                        key={index}
                        onClick={() => navigate(item.path)}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={{
                            display: 'flex',
                            cursor: 'pointer',
                            border: '2px solid yellow',
                            borderRadius: '20px',
                            justifyContent: 'center',
                            width: '80px',
                            backgroundColor: isActive || isHover ? 'yellow' : 'transparent',
                            color: isActive || isHover ? 'black' : 'white',
                            transition: "0.2s"
                        }}
                    >
                        {item.title}
                    </div>
                );
            })}
        </div>
    );
};

export default Navbar;