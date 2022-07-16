import React from 'react'
import axios from 'axios'
function Categories({ categories }) {
  
  return (
    <div>Categories</div>
  )
}

export default Categories

export async function getStaticPaths(){
    const categories = await axios.get(
      "https://e-commerce-backend-2022.herokuapp.com/categories"
    );
    const paths = categories.data.map((category) => {
        
      return {
        params: {
          categories: `${category}`,
        },

      }
    })
    return {
        paths,
        fallback: false
    }

    
}
export async function getStaticProps(context) {
  const { params } = context;
  const categories = await axios.get(
    `https://e-commerce-backend-2022.herokuapp.com/product/category/${params.categories}`
  );
  return {
    props: {
      categories: categories.data,
    },
  };
}

