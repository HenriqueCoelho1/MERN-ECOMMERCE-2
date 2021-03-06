import React, { useEffect, useState } from 'react'
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'

const Product = ({ match }) => {


    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])
    const { slug } = match.params

    const { user } = useSelector((state) => ({ ...state }))

    // console.log("PRODUCT ->>>>>>>>>>", product)
    // console.log("PRODUCT RATINGS ->>>>>>>>>", product.ratings)

    useEffect(() => {
        loadingSingleProduct()

    }, [slug])

    useEffect(() => {
        console.log("HERE PRODUCT ------->", product)

        if (product.ratings && user) {
            let existingAlreadyObject = product.ratings.find((ele) => (
                ele.postedBy.toString() === user._id.toString()
            ))

            existingAlreadyObject && setStar(existingAlreadyObject)

        }

    }, [])

    const loadingSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data)
            getRelated(res.data._id).then(res => setRelated(res.data))
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)


        productStar(name, newRating, user.token)
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

            <div className="row">
                {related.length > 0 ?
                    related.map((r) =>
                        <div className="col-md-4" key={r._id}><ProductCard product={r} /></div>)
                    : <div className="text-center col">No products found</div>}
            </div>
        </div>


    )
}

export default Product
