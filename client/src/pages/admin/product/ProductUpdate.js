import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/form/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/form/ProductUpdateForm'

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Acer"],
    color: "",
    brand: ""
}


const ProductUpdate = ({ match }) => {

    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()

    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                setValues({ ...values, ...p.data })
            })
    }

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }))

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log("Clicked Down", e.target.value)
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value)
            .then((res) => {
                console.log("ALL CATEGORIES", res)
                setSubOptions(res.data)

            })
        setShowSub(true)

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product Update</h4>
                    <hr />
                    {JSON.stringify(values)}
                    <ProductUpdateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues}
                        categories={categories}
                        showSub={showSub}
                        handleCategoryChange={handleCategoryChange} />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
