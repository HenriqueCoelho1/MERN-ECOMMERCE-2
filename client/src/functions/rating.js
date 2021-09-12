import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        //verifica se o produto existe assim como seu valor
        let total = []
        //prepara o array
        let length = ratingsArray.length
        //quanta a quantidade do array
        console.log("Length", length)
        //conta a quantidade  de posicoes do array

        ratingsArray.map((r) => total.push(r.star))
        //coloca dentro do array 'total' a quantidade de posicoes das star 
        let totalReduce = total.reduce((p, n) => p + n, 0)
        //soma todos os numeros dentro do array apartir da  posicao 0
        console.log("totalReduce", totalReduce)

        let highest = length * 5
        //verifica a quantidade total mult por 5
        console.log("highest", highest)
        let result = (totalReduce * 5) / highest
        //verifica media das avaliacoes usando o a totalDasNotas * 5  / (quantidade * 5)
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

