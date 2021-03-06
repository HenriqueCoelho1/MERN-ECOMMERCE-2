import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import { SEARCH_QUERY } from '../actions/types'
import Star from '../components/form/Star'


const { ItemGroup, SubMenu } = Menu
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [star, setStar] = useState("")
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState("")

    let dispatch = useDispatch()
    let { search } = useSelector((state) => ({ ...state })) //get the text

    const { text } = search //getting the text from the search state
    useEffect(() => {
        loadAllProducts()
        getCategories().then(res => setCategories(res.data))
        getSubs().then(res => setSubs(res.data))

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
        else {
            fetchProducts({ price })

        }

        // fetchProducts({ price })

    }, [ok])


    const handleSlider = (value) => {
        dispatch({
            type: SEARCH_QUERY,
            payload: { text: "" }
        })
        setCategoryIds([])
        setPrice(value)
        setStar("")
        setSub("")
        setTimeout(() => {
            setOk(!ok)

        }, 300)

    }

    //4. load products based on category
    // show categories in a checkbox

    const showCategories = () => categories.map(c =>
        <div key={c._id}>
            <Checkbox
                onChange={handleCheckCategories}
                className="pb-2 pl-4 pr-4"
                value={c._id}
                name="category"
                checked={categoryIds.includes(c._id)}>
                {c.name}
            </Checkbox>
        </div>)

    const handleCheckCategories = (e) => {
        dispatch({
            type: SEARCH_QUERY,
            payload: { text: "" }
        })
        setPrice([0, 0])
        setStar("")
        setSub("")
        // console.log(e.target.value)
        let inTheState = [...categoryIds] //the values in the array already pushed
        let justChecked = e.target.value //the actual checkbox value
        let foundInTheState = inTheState.indexOf(justChecked) //return index or -1

        if (foundInTheState === -1) {
            inTheState.push(justChecked)

        } else {
            //if found pull out 1 item from index
            inTheState.splice(foundInTheState, 1)
        }

        setCategoryIds(inTheState)
        // console.log(inTheState)

        fetchProducts({ category: inTheState })
    }

    //5. show products by star rating

    const handleStarClick = (num) => {
        // console.log(num)

        dispatch({
            type: SEARCH_QUERY,
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar(num)
        setSub("")
        fetchProducts({ stars: num })

    }

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick}
                numberOfStars={5}
            />
            <Star starClick={handleStarClick}
                numberOfStars={4}
            />
            <Star starClick={handleStarClick}
                numberOfStars={3}
            />
            <Star starClick={handleStarClick}
                numberOfStars={2}
            />
            <Star starClick={handleStarClick}
                numberOfStars={1}
            />

        </div>
    )

    //6. show products by subs

    const showSubs = () => subs.map(s =>
        <div
            className="p-1 m-1 badge badge-secondary"
            onClick={() => handleSubmit(s)} key={s._id}
            style={{ cursor: "pointer" }}>
            {s.name}
        </div>)

    const handleSubmit = sub => {
        // console.log("SUB", sub)
        setSub(sub)

        dispatch({
            type: SEARCH_QUERY,
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar("")
        fetchProducts({ sub })

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter menu</h4>
                    <hr />

                    <Menu defaultOpenKeys={['1', '2', '3', '4']} mode="inline">
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

                        <SubMenu key="2" title={
                            <span className="h6">
                                <DownSquareOutlined />{" "}Categories
                            </span>}>
                            <div style={{ marginTop: '-10px' }}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu key="3" title={
                            <span className="h6">
                                <StarOutlined />{" "}Rating
                            </span>}>
                            <div style={{ marginTop: '-10px' }}>
                                {showStars()}
                            </div>
                        </SubMenu>

                        <SubMenu key="4" title={
                            <span className="h6">
                                <DownSquareOutlined />{" "}Subs
                            </span>}>
                            <div style={{ marginTop: '-10px' }}>
                                {showSubs()}
                            </div>
                        </SubMenu>
                    </Menu>

                </div>

                <div className="col-md-9 pt-2">
                    {loading ? (<h4 className="text-danger">Loading...</h4>)
                        :
                        (<h4 className="text-danger">Products</h4>)}

                    {products && products.length < 1 && <p>Products not found</p>}

                    <div className="row pb-5">
                        {products && products.map(p =>
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
