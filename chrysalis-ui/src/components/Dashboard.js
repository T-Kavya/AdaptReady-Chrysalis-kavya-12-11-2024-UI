import React from "react";
import background03 from "../assets/Background03.jpeg";
import "../scss/Dashboard.scss";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const data = [
        {
            route: "/dishlist",
            title: "We have all various dishes in our Restaurant",
            description: "Explore Here",
        },
        {
            route: "/suggest",
            title: "Discover the best food and drinks based on your ingredients",
            description: "Ask me",
        },
    ];

    return (
        <div>
            <div className="image-container">
                <img src={background03} alt="Background Image" />
                <div className="text">Order Food for delivery or <br /> pickup today </div>
            </div>
            <div className="cards">
                {data.map((item) => (
                    <Card
                        key={item.id}
                        url={item.url}
                        title={item.title}
                        description={item.description}
                        onClick={() => {
                            navigate(`${item.route}`);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;