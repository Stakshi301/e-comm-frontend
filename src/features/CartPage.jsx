import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  // const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/user/carts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
  
        const data = await response.json();
        console.log("Fetched Cart Data: ", data);
        setCartItems(data || []); // <- FIXED
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItems();
  }, []);
  
  

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
  
      await fetch(`http://localhost:5000/user/removeCart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update state
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from Cart:", err);
    }
  };

  const handleMoveToWishlist = async (productId) => {
    const token = localStorage.getItem("token");  // get token
  
    console.log("🔑 Sending token:", token); // Log the token 
    try {
      const response = await fetch(`http://localhost:5000/user/moveToWish/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,  // Send token in header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Item moved to wishlist:", data); //log successful response
      } else {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData); // Log error response 
        throw new Error(errorData.message || "Failed to move item to wishlist");
      }
    } catch (error) {
      console.error("❌ Error moving item to wishlist:", error); // log error 
    }
  };
  

  
  return (
    <div className="bg-gray-100 min-h-screen">
    <Navbar />

    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>

      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-30 ml-14 mt-2 h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                <p className="text-lg font-semibold text-green-500 mt-3">
                  ${item.price}
                </p>
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMoveToWishlist(item._id)}
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Move to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 font-semibold">No items in your cart.</p>
      )}

       {/* dummy jsut ui*/}
      {cartItems.length > 0 && (
        <div className="mt-8 flex justify-between items-center bg-[#96F7E4] p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Cart Summary</h3>
          <p className="text-lg font-semibold text-gray-800">Total: $</p>
        </div>
      )}

       {/* dummy jsut ui*/}
     {cartItems.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button className="bg-pink-400 text-white py-2 px-6 rounded-md hover:bg-pink-500 transition">
            Checkout
          </button>
        </div>
      )}
    </div>

    <Footer />
  </div>
  );
};

export default CartPage;
