import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories") // Backend API
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h2>All Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.categoryName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCategories;
