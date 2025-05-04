import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProducts(result); // Store the data in the state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // set load false when req is done
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in or token missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Send token  in header
        },
        body: JSON.stringify({ cartId: productId }), 
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add to cart");

      console.log("✅ Successfully added to cart", data);
      alert("✅ Product added to cart");
    } catch (err) {
      console.error("❌ Failed to add to Cart:", err.message);
      alert("❌ Product already in cart");
    }
  };

  const handleAddToWishlist = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add to wishlist");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wishlistId: product._id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to wishlist");
      }

      alert("✅ Added to Wishlist");
    } catch (err) {
      console.error("❌ Error adding to wishlist:", err.message);
      alert("❌ Failed to add to Wishlist");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
    <Navbar />

    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center py-16 text-xl font-semibold text-gray-600">
          <span>Loading products...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          Error loading products: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-40 ml-26 mt-2 h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <p className="text-lg font-semibold text-green-500 mt-3">
                  ${product.price}
                </p>
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <Footer />
  </div>
  );
};

export default ProductPage;
