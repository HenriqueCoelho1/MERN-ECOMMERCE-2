import React, { useState, useEffect } from 'react'
import { getCategory } from '../../functions/category'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getCategory(slug).then(c => {
            console.log("/category/:slug", c.data)
            setCategory(c.data)

        })

    }, [])
    return (
        <p>
            {match.params.slug}

        </p>
    )
}

export default CategoryHome
