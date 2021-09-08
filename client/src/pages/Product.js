import React, { useEffect, useState } from 'react'
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'

const Product = ({ match }) => {


    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const { slug } = match.params

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadingSingleProduct()

    }, [slug])


    const loadingSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data)
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)


        productStar(name, star, user.token)
            .then(res => {
                console.log("STAR RESPONSE -->", res.data)
                loadingSingleProduct()
            })
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />

            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <h4>Related Products</h4>
                </div>
            </div>
        </div>

    )
}

export default Product
