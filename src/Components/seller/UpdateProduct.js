import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SellerMenuBar from "./SellerMenuBar";
import { url } from "../../common/constants";
import { Button } from "reactstrap";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [category, setCategory] = useState(0);
  const [seller, setSeller] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productImage, setProductImage] = useState(undefined);
  const history = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setSeller(data.id);
    
    // Fetch existing product details
    axios.get(`${url}/products/id/${id}`).then((response) => {
      const product = response.data;
      setProductName(product.productName);
      setProductDescription(product.productDescription);
      setQuantity(product.quantity);
      setUnit(product.unit);
      setProductPrice(product.productPrice);
      setProductDiscount(product.productDiscount);
      setProductRating(product.productRating);
      setCategory(product.category.id);
    });
  }, [id]);

  const updateProduct = () => {
    const body = new FormData();
    body.append("productName", productName);
    body.append("productDescription", productDescription);
    body.append("quantity", quantity);
    body.append("unit", unit);
    body.append("productPrice", productPrice);
    body.append("productDiscount", productDiscount);
    body.append("productRating", productRating);
    if (productImage) {
      body.append("productImage", productImage);
    }

    axios
      .put(`${url}/products/id/${id}/category/${category}/seller/${seller}`, body)
      .then((response) => {
        const result = response.data;
        if (result) {
          alert("Product updated successfully");
          history("/sellerDashboard");
        } else {
          alert("Error updating product");
        }
      });
  };

  const dashboard = () => {
    history("/sellerDashboard");
  };

  return (
    <div className="row">
      <SellerMenuBar />
      <div className="col-8 py-2">
        <h2 className="text-indigo-600" style={{ textAlign: "left" }}>
          Update Product
        </h2>
        <div>
          <input onChange={(e) => setProductName(e.target.value)} value={productName} className="form-control mb-4" type="text" placeholder="Product Name" required style={{ width: "400px" }} />
          <input onChange={(e) => setProductDescription(e.target.value)} value={productDescription} className="form-control mb-4" type="text" placeholder="Product Description" required style={{ width: "400px" }} />
          <input onChange={(e) => setCategory(e.target.value)} value={category} className="form-control mb-4" type="text" placeholder="Category Id" required style={{ width: "400px" }} />
          <input onChange={(e) => setQuantity(e.target.value)} value={quantity} className="form-control mb-4" type="text" placeholder="Quantity" required style={{ width: "400px" }} />
          <select onChange={(e) => setUnit(e.target.value)} value={unit} className="form-control mb-4" required style={{ width: "400px" }}>
            <option value="" disabled>Select Unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="l">Liters (l)</option>
            <option value="ml">Milliliters (ml)</option>
            <option value="dz">Dozen (doz)</option>
          </select>
          <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice} className="form-control mb-4" type="text" placeholder="Product Price" required style={{ width: "400px" }} />
          <input onChange={(e) => setProductDiscount(e.target.value)} value={productDiscount} className="form-control mb-4" type="text" placeholder="Product Discount" required style={{ width: "400px" }} />
          <input onChange={(e) => setProductRating(e.target.value)} value={productRating} className="form-control mb-4" type="text" placeholder="Product Rating" required style={{ width: "400px" }} />
          <input onChange={(e) => setProductImage(e.target.files[0])} className="form-control mb-4" type="file" placeholder="Product Image" style={{ width: "400px" }} />
          <div style={{ textAlign: "left" }}>
            <button onClick={updateProduct} className="btn btn-info">Update Product</button>
            <Button onClick={dashboard} className="ml-3">Back To Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
