import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import ProductOverview from "../../components/ProductDisplay/ProductOverview";
import Rating from "../../components/ProductDisplay/Rating";
import Favorite from "../ProductDisplay/FavoriteIcon";
import Basket from "../../components/ProductDisplay/Basket";
import ProductTitleAndPrice from "../ProductDisplay/ProductTitleAndPrice";

function RecommendationsProductPage({ category }) {
  const [products, setProducts] = useState([]);
  const serverRequest = `/product/${category}`;

  const { error, performFetch } = useFetch(serverRequest, (response) => {
    const shuffledArray = response.result
      .slice()
      .sort(() => 0.5 - Math.random());
    setProducts(shuffledArray.slice(0, 3));
  });

  useEffect(() => {
    performFetch();
  }, [category]);

  return (
    <div className="product-page-recommend-block">
      <h3 className="product-page-recommend-title">You may also like</h3>
      {products &&
        products.map((product) => {
          return (
            <div className="product-display-component" key={product._id}>
              <ProductOverview product={product} />
              <div className="white-background">
                <ProductTitleAndPrice product={product} />
                <Rating productRating={product.rate} product={product} />
                <div className="product-options">
                  <Favorite />
                  <Basket product={product} />
                </div>
              </div>
            </div>
          );
        })}
      {error && <div>Error: {error.toString()}</div>}
    </div>
  );
}

RecommendationsProductPage.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RecommendationsProductPage;
