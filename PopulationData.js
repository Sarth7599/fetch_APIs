import React, { useEffect, useState } from 'react';
import "./PopulationData.css";
const PopulationData = () => {
    const [search, setSearch] = useState("")
    const [populationData, setPopulationData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPopulationData(data.data); // Assuming `data.data` contains the relevant information
            } catch (error) {
                setError(error.message);
                console.error('Error fetching population data:', error);
            }
        };

        {/*let handleChange = (evt) => setSearch(evt.target.value);*/}

        fetchPopulationData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/*<input 
            type='text' 
            placeholder='Search'
            value={search}
            onChange={handleChange}/>*/}
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {populationData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Year}</td>
                            <td>{item.Population}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PopulationData;
