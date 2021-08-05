import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const CategoryCreate = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])




    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success(`"${res.data.name}" is create`)
                loadCategories()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted!`)
                    loadCategories()
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(`${err.response.name}`)

                    }

                })
        }

    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Category Create</h4>}
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            autoFocus
                            required />

                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                    <h4 />
                    {categories.map(c => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}{" "}
                            <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right"><EditOutlined className="text-warning" /></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default CategoryCreate