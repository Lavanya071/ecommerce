import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import ProductList from '../component/ProductList';
import Categories from '../component/Categories';
import basicOps from '../utility/basicOps';
import { usePaginationContext } from '../component/context/PaginationContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [sortDir, setSortDir] = useState(0);
  const [categories, setCategory] = useState([]);
  const [currCategory, setCurrCategory] = useState('All Categories');

  const { pageSize, pageNum, setPageNum, setPageSize } = usePaginationContext();

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://fakestoreapi.com/products');
      const productData = await resp.json();
      setProducts(productData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://fakestoreapi.com/products/categories");
      const categoriesData = await resp.json();
      setCategory(categoriesData);
    })();
  }, []);

  const { filteredCategory, totalPages } = basicOps(products, searchTerm, sortDir, currCategory, pageSize, pageNum);

  return (
    <>
      <header className="navbar">
        <div className="logo">Amazon</div>

        <div className="search_sortwrap">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageNum(1);
            }}
            placeholder="Search products..."
          />
          <div className="icons_container">
            <AiOutlineArrowUp onClick={() => {
              setSortDir(1);
              setPageNum(1);
            }} />
            <AiOutlineArrowDown onClick={() => {
              setSortDir(-1);
              setPageNum(1);
            }} />
          </div>
        </div>

        <div className="catagories_wrapper">
          <Categories
            categories={categories}
            setCurrCategory={setCurrCategory}
          />
        </div>
      </header>

      <main className="product-grid">
        <ProductList productList={filteredCategory} />
      </main>

      <div className="pagination">
        <button
          onClick={() => {
            if (pageNum > 1) {
              setPageNum(pageNum - 1);
            }
          }}
          disabled={pageNum === 1}
        >
          <AiOutlineArrowLeft />
        </button>

        <div className="pagenum">{pageNum}</div>

        <button
          onClick={() => {
            if (pageNum < totalPages) {
              setPageNum(pageNum + 1);
            }
          }}
          disabled={pageNum === totalPages}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </>
  );
};

export default Home;
