import React, { useEffect, useState } from 'react'
import { getProducts } from '../../functions/product'
import ProductCard from '../../components/cards/ProductCard'
import LoadingCard from '../../components/cards/LoadingCard'

const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts("createdAt", "desc", 3)
            .then(res => {
                setLoading(false)
                setProducts(res.data)
            })

    }

    return (
        <>

            <div className="container">
                {loading ? <LoadingCard
                    count={products.length}
                />
                    : <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4">
                                <ProductCard product={product} />
                            </div>

                        ))}
                    </div>}
            </div>
        </>
    )
}

export default NewArrivals
