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
    const [arrayOfSubsIds, setArrayOfSubsIds] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()

    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                //load single product
                setValues({ ...values, ...p.data })
                //load single product category subs
                if (p && p.data && p.data.category) {
                    getCategorySubs(p.data.category._id).then((res) => {
                        setSubOptions(res.data); // on first load, show default subs
                    });
                }
                //prepare array of subs ids to show as default

                let arr = []
                p.data.subs.map(s => {
                    arr.push(s._id)
                })
                console.log(arr)
                setArrayOfSubsIds(prev => arr)
            })

    }

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data)
            setCategories(c.data)
        })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log("Clicked Down", e.target.value)
        setValues({ ...values, subs: [] })

        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value)
            .then((res) => {
                console.log("ALL SUB CATEGORIES", res)
                setSubOptions(res.data)

            })

        console.log("Category Existing value.category", values.category)
        //if user click back to the original category 
        //show it subs category in default
        if (values.category._id === e.target.value) {
            loadProduct()
        }
        setArrayOfSubsIds([])

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? <LoadingOutlined className="text-danger" /> : <h4>Product Update</h4>}
                    <hr />
                    {JSON.stringify(values)}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading} />
                    </div>


                    <ProductUpdateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues}
                        categories={categories}
                        showSub={showSub}
                        subOptions={subOptions}
                        handleCategoryChange={handleCategoryChange}
                        arrayOfSubsIds={arrayOfSubsIds}
                        setArrayOfSubsIds={setArrayOfSubsIds}
                        selectedCategory={selectedCategory} />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
