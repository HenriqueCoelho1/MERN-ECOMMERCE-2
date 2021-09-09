import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length
        console.log("Length", length)

        ratingsArray.map((r) => total.push(r.star))
        let totalReduce = total.reduce((p, n) => p + n, 0)
        console.log("totalReduce", totalReduce)

        let highest = length * 5
        console.log("highest", highest)
        let result = (totalReduce * 5) / highest
        console.log("result", result)


        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating
                        starDimension="20px"
                        startPacing="2px"
                        starRatedColor="red"
                        editing={false}
                        rating={result} /> ({p.ratings.length}) {p.ratings > 1 ? "reviews" : "review"}
                </span>
            </div>
        )


    }
}

