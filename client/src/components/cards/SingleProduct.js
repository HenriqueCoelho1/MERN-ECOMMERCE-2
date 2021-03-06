import React from 'react'
import { Card, Descriptions, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import defaultImage from '../../images/default.png'
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { showAverage } from '../../functions/rating'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {

    const { title, images, description, _id } = product
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => (
                        <img src={i.url} key={i.public_id} />
                    ))}
                </Carousel> :
                    <Card
                        cover={
                            <img src={defaultImage} className="mb-3 card-image" />
                        }
                    ></Card>}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xx xxx xxxxx to learn more about this product
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product && product.ratings && product.ratings.length > 0
                    ? showAverage(product) :
                    <div className="text-center pt-1 pb-3">No Rating Yet</div>}

                <Card actions={[
                    <>
                        <ShoppingCartOutlined className="text-success" /> <br /> Add To Cart
                    </>,
                    <Link to="/"><HeartOutlined className="text-info" /><br /> Add To Wishlist</Link>,
                    <RatingModal>
                        <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            changeRating={onStarClick}
                            isSelectable={true}
                            starRatedColor="red"
                        />
                        {/* //this is not children is the star rating when the modal is turned to true */}
                    </RatingModal>
                ]} >
                    <ProductListItems product={product} />
                </Card>
            </div>

        </>
    )
}

export default SingleProduct
