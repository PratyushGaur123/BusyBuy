import { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import "../static/HomePage.css";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    position: "absolute",
    top: "50vh",
    left: "50vw"
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const products = await axios.get('https://fakestoreapi.com/products');
        console.log("Products have been fetched successfully");
        setProducts(products.data);
        setLoading(false);
      }
      catch (err) {
        console.log("Error in fetching the products: ", err);
      }
    }
    fetchProducts();
  }, []);

  function handleSearch(e){
    if(e.target.value === ''){
      return;
    }
    const filteredProducts = products.filter( (product)=> product.title.includes(e.target.value));
    setProducts(filteredProducts);
  }

  return (
    loading ? <GridLoader color="#6d4ee6" size={20} speedMultiplier={2} cssOverride={override} /> : 
    (
      <div className="homepage-container">
        <aside className="filter-sidebar">
          <h2 className="filter-heading">Filter</h2>
          <form>
            <label htmlFor="price"> Price:  </label>
            <input type="range" id="price" name="price" min={1}  max={1200} step={5} className="filter-range" />
          </form>

          <h2 className="filter-heading">Category</h2>
          <div className="category-container">
            <div>
              <input type="checkbox" name="mensFashion" id="mensFashion" className="filter-checkbox"/>
              <label htmlFor="mensFashion">Men's Fashion</label>
            </div>
            <div>
              <input type="checkbox" name="womensFashion" id="womensFashion" className="filter-checkbox"/>
              <label htmlFor="womensFashion">Women's Fashion</label>
            </div>
            <div>
              <input type="checkbox" name="jewellery" id="jewellery" className="filter-checkbox"/>
              <label htmlFor="jewellery">Jewellery</label>
            </div>
            <div>
              <input type="checkbox" name="electronics" id="electronics" className="filter-checkbox"/>
              <label htmlFor="electronics"> Electronics </label>
            </div>
          </div>


        </aside>
        <form className="home-form">
          <input type="search" placeholder="Search By Name" className="item-search" onChange={handleSearch} />
        </form>
        <div className="items-container">
          <Item products={products} />
        </div>
      </div>
  )
    
  )
}

export default Home;




