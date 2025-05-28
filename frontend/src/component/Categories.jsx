import React from 'react';
import { usePaginationContext } from './context/PaginationContext';

const Categories = (props) => {
    const {categories,setCurrCategory} =props;
    const {setPageNum}=usePaginationContext();
    return (
        <>
         <button className='category_option'  onClick={() => {setCurrCategory('All Categories')
          setPageNum(1); }
         }>All Category</button>
                  {categories.map((cat)=>{
                    return <button key={cat} onClick={()=>{
                      
                      setCurrCategory(cat)     
                      setPageNum(1); 
                    }}>{cat}</button>
                  })}
        
        </>
)};

export default Categories;