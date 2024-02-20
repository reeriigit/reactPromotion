import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
    const [data, setData] = useState([]);
    const { storeId } = useParams();

    useEffect(() => {
        axios.get(`/get_stores/${storeId}`) // Assuming the correct API endpoint
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [storeId]);

    return (
        <div className="container-fluid bg-primary vh-100 vm-100">
            <h1>Store {storeId}</h1>
            <Link to='/' className="">Back</Link>
            {data.map((store) => (
                <ul key={store.storeId}>
                    <li>
                        <b>Store ID:</b> {store.storeId}
                    </li>
                    <li>
                        <b>Store Name:</b> {store.storeName}
                    </li>
                    <li>
                        <b>Store Type:</b> {store.storeType}
                    </li>
                    <li>
                        <b>Store Description:</b> {store.storeDes}
                    </li>
                    <li>
                        <b>Email:</b> {store.email}
                    </li>
                    <li>
                        <b>Password:</b> {store.pass}
                    </li>
                    <li>
                        <b>Phone:</b> {store.phone}
                    </li>
                    <li>
                        <b>Address:</b> {store.address}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default Read;
