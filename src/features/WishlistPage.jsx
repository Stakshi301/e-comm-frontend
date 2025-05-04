import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get('https://e-comm-backend-lake.vercel.app/user/wishlisted', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err.response?.data || err.message);
        setError(err.message);
      } finally {
        setLoading(false); // ensure loading is false
      }
    };
  
    fetchWishlist();
  }, []);
  
  

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
  
      await fetch(`https://e-comm-backend-lake.vercel.app/user/removeWishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update state
      setWishlist(wishlist.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };
  
  const handleMoveToCart = async (productId) => {
    const token = localStorage.getItem("token");  // Get  token
  
    console.log("🔑 Sending token:", token); // Log token
    try {
      const response = await fetch(`https://e-comm-backend-lake.vercel.app/user/moveToCart/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Item moved to cart:", data); //log successful res
      } else {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData); //log err res
        throw new Error(errorData.message || "Failed to move item to cart");
      }
    } catch (error) {
      console.error("❌ Error moving item to cart:", error); //log err
    }
  };
  
  
  


  return (
    <div className="bg-gray-100 min-h-screen">
    <Navbar />
  
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h2>
  
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 ml-18 mt-2 h-48 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-md font-semibold text-green-500 mt-2">${item.price}</p>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMoveToCart(item._id)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10 text-lg font-medium">Your wishlist is empty.</p>
      )}
    </div>
  
    <Footer />
  </div>
  
  );
};

export default WishlistPage;
