import React from 'react'
import { Card } from 'antd'
import StarRating from 'react-star-ratings'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import defaultImage from '../../images/default.png'
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'

const ProductCard = ({ product }) => {
    const { images, title, description, slug } = product
    const { Meta } = Card
    return (
        <>
            {product && product.ratings && product.ratings.length > 0
                ? showAverage(product) :
                <div className="text-center pt-1 pb-3">No Rating Yet</div>}
            <Card cover={
                <img src={images && images.length ? images[0].url : defaultImage}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1" />
            }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
                    </Link>,
                    <><ShoppingCartOutlined className="text-info" /> <br /> View Product</>
                ]}>

                <Meta title={title}
                    description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </>
    )
}

export default ProductCard
