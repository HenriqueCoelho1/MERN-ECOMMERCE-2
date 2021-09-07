import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'




const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [modal, setModal] = useState(false)
    return (
        <>
            <div onClick={() => setModal(true)}>
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

        </>
    )
}

export default RatingModal
