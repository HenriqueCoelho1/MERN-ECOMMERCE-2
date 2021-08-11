import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/form/ProductCreateForm'


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    sub: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Acer"],
    color: "",
    brand: ""
}

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)

    const { user } = useSelector((state) => ({ ...state }))

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then((res) => {
                console.log(res)
                window.alert(`${res.data.title} is created`)
                window.location.reload()
                // toast.success(`Your product is created`)
            }).catch((err) => {
                console.log(err)
                // if (err.response.status === 400) toast.error(err.response.data)
                toast.error(err.response.data.err)
            })
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product Create</h4>
                    <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} />

                </div>
            </div>
        </div>
    )
}

export default ProductCreate
