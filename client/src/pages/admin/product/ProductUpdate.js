import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import ProductCreateForm from '../../../components/form/ProductCreateForm'
import FileUpload from '../../../components/form/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'

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

const ProductUpdate = () => {

    const { user } = useSelector((state) => ({ ...state }))


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product Update</h4>
                    <hr />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
