import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import Jumbotron from '../components//cards/Jumbotron'


const Home = () => {


    const text1 = "Latest Products"
    const text2 = "New Arrivals"
    const text3 = "Best Sellers"

    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={[text1, text2, text3]} />
            </div>

            <h4 className="text-center p-3 mb-5 display-4 jumbotron">New Arrivals</h4>
            <NewArrivals />


        </>
    )
}

export default Home
