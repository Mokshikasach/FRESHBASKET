import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories/${categoryId}/products`) // API for category products
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, [categoryId]);

  return (
    <div>
      <h2>Products in this Category</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <img src={product.imageUrl} alt={product.productName} width="100" height="100" />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
