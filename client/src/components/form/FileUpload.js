import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const fileUploadAndResize = (e) => {
        let files = e.target.files

        let allUploadFiles = values.images

        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                        headers: {
                            authtoken: user ? user.token : ""
                        }
                    }).then(res => {
                        console.log("IMAGE UPLOAD RESPONSE", res)
                        setLoading(false)
                        allUploadFiles.push(res.data)

                        setValues({ ...values, images: allUploadFiles })

                    }).catch(err => {
                        setLoading(false)
                        console.log("FAILED IN UPLOAD IMAGE!", err)
                    })

                }, "base64")

            }
        }

    }
    return (
        <>
            <div className="row">
                {values.images && values.images.map((image) => (
                    <Avatar key={image.public_id} src={image.url} size={100} />

                ))}
            </div>
            <div className="row">
                <label className="btn btn-primary">Choose File
                    <input type="file" hidden multiple accept="images/*" onChange={fileUploadAndResize} />
                </label>
            </div>
        </>

    )
}

export default FileUpload
