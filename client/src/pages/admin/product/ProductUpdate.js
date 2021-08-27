import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import ProductCreateForm from '../../../components/form/ProductCreateForm'
import FileUpload from '../../../components/form/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/form/ProductUpdateForm'

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
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
    // const [subOptions, setSubOptions] = useState([])
    // const [showSub, setShowSub] = useState(false)
    // const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = match.params

    useEffect(() => {
        loadProduct()

    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                setValues({ ...values, ...p.data })
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
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
                    <h4>Product Update</h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <ProductUpdateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues} />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
