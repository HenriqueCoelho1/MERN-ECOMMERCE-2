import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(3)
            .then(res => {
                setLoading(false)
                setProducts(res.data)
            })

    }

    const text1 = "Latest Products"
    const text2 = "New Arrivals"
    const text3 = "Best Sellers"
    return (
        <>
            <div className="jumbotron">
                <Jumbotron text={[text1, text2, text3]} />
            </div>

            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <ProductCard product={product} />
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
