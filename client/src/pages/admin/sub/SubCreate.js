import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories } from '../../../functions/category'
import { createSub, getSub, removeSub, getSubs } from '../../../functions/sub'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/form/CategoryForm'
import LocalSearch from '../../../components/form/LocalSearch'

const SubCreate = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState("")
    const [keyword, setKeyword] = useState("")




    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))
    const loadSubs = () => getSubs().then((c) => setSubs(c.data))


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success(`"${res.data.name}" is create`)
                loadSubs()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted!`)
                    loadSubs()

                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(`${err.response.name}`)

                    }

                })
        }

    }



    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Sub Category</h4>}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setCategory(e.target.value)}>
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option value={c._id} key={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    <h4 />
                    {subs.filter(searched(keyword)).map(s => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}{" "}
                            <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right"><EditOutlined className="text-warning" /></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default SubCreate
