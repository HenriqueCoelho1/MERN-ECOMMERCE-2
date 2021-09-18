import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { SEARCH_QUERY } from '../actions/types'


const { ItemGroup, SubMenu } = Menu
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)

    let dispatch = useDispatch()
    let { search } = useSelector((state) => ({ ...state })) //get the text

    const { text } = search //getting the text from the search state
    useEffect(() => {
        loadAllProducts()

    }, [])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then(res => {
            setProducts(res.data)
        })
    }

    //1. load products by default on page load 
    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(12).then(p => {
            setProducts(p.data)
            setLoading(false)
        })
    }

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            // console.log("text from the state ---> Shop.js", text)
            fetchProducts({ query: text })

        }, 300)

        return () => clearTimeout(delayed)
    }, [text])

    //3. load products based on price range
    useEffect(() => {
        console.log("ok to request")
        if (price[0] === 0 && price[1] === 0) {
            loadAllProducts()
        }// this if statement load all products when the reach the 0 and 0, this work at beginning 
        fetchProducts({ price })
    }, [ok])


    const handleSlider = (value) => {
        dispatch({
            type: SEARCH_QUERY,
            payload: { text: "" }
        })
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)

        }, 300)

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter menu</h4>
                    <hr />

                    <Menu defaultOpenKeys={['1', '2']} mode="inline">
                        <SubMenu key="1" title={<span className="h6">
                            <DollarOutlined />{" "}Price
                        </span>}>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="2999" />
                            </div>

                        </SubMenu>
                    </Menu>

                </div>

                <div className="col-md-9 pt-2">
                    {loading ? (<h4 className="text-danger">Loading...</h4>)
                        :
                        (<h4 className="text-danger">Products</h4>)}

                    {products.length < 1 && <p>Product not found</p>}

                    <div className="row pb-5">
                        {products.map(p =>
                        (<div className="col-md-4 mt-5" key={p._id}>
                            <ProductCard product={p} />
                        </div>))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop
