import React, { useEffect, useState } from 'react'
import { getProduct } from '../functions/product'

const Product = ({ match }) => {


    const [product, setProduct] = useState({})
    const { slug } = match.params

    useEffect(() => {
        loadingSingleProduct()

    }, [slug])


    const loadingSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data)
        })
    }

    return (
        <>
            {JSON.stringify(product)}
        </>

    )
}

export default Product
