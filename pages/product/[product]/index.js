import React from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
function Product({ product }) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    else{ return (<>
    <div>Product</div>
    <div>{product.name}</div>
    <div>{product.price}</div>
    <div>{product.description}</div>
    </>
  )
}
}

export default Product
export async function getStaticProps(context) {
    const {params} = context
    const product = await axios.get(`https://e-commerce-backend-2022.herokuapp.com/product/${params.product}`)
    return {
        props: {
            product: product.data,
        },
    }
}
export async function getStaticPaths() {
    return {
        paths: [
            {params: {product: '62af51ffb6bbeb8aa8051607'}},

        ],
        fallback: true,
    }
}

