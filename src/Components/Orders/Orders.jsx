import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getAllOrders() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/', {
                headers: {
                    token: localStorage.getItem('token'), // Include token if required
                },
            });
            console.log(data.data);
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    if (isLoading) {
        return <Loading />; // Assuming you have a Loading component to show while data is being fetched
    }

    return (
        <div>
            <h1 className="text-center text-lg text-green-400">Orders</h1>
            {orders.length === 0 ? (
                <h1 className="text-center my-4 text-red-600 text-xl">No orders found</h1>
            ) : (
                orders.map(order => (
                    <div key={order._id} className="shadow p-4 mb-4 rounded-lg">
                        <h2 className="font-bold text-xl mb-2">Order ID: {order._id}</h2>
                        {order.cartItems.map((item, index) => (
                            <div key={index} className="flex items-center mb-4">
                                <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                                <div>
                                    <p className="font-bold">{item.product.title}</p>
                                    <p>{item.quantity} x {item.product.price} EGP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;
