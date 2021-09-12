import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'



const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [modal, setModal] = useState(false)


    let history = useHistory()
    let { slug } = useParams()

    const handleModal = () => {
        if (user && user.token) {
            setModal(true)
        } else {
            history.push({
                pathname: "/login",
                state: { from: `/product/${slug}` }
            })
        }

    }
    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br /> {user ? "Leave Rating" : "Login To Leave Rating"}
            </div>
            <Modal
                title={"Leave Your Rating"}
                centered
                visible={modal}
                onOk={() => {
                    setModal(false)
                    toast.success("Thanks For Your Review")
                }}
                onCancel={() => setModal(false)}
            >{children}</Modal>
            {/* //this children is the star rating when the modal is turned to true */}

        </>
    )
}

export default RatingModal
