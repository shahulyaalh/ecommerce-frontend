import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams,setsearchParams]=useSearchParams()

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/products?"+searchParams)
      .then(res => res.json()) // Properly parse JSON
      .then(res => {
        if (res && res.products) {
          setProducts(res.products);
        } else {
          console.error("Invalid API response:", res);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [searchParams]);

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </section>
    </Fragment>
  );
}
