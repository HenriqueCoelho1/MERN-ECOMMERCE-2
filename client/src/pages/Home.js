import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import Jumbotron from '../components//cards/Jumbotron'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'


const Home = () => {


    const text1 = "Latest Products"
    const text2 = "New Arrivals"
    const text3 = "Best Sellers"
    const text4 = "Category List"

    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={[text1, text2, text3]} />
            </div>

            <h4 className="text-center p-3 mb-5 display-4 jumbotron">{text2}</h4>
            <NewArrivals />

            <h4 className="text-center p-3 mb-5 display-4 jumbotron">{text3}</h4>
            <BestSellers />

            <h4 className="text-center p-3 mb-5 display-4 jumbotron">{text4}</h4>
            <CategoryList />

            <h4 className="text-center p-3 mb-5 display-4 jumbotron">Sub Categories</h4>
            <SubList />


        </>
    )
}

export default Home
