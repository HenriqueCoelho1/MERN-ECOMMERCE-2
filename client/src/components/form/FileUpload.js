import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FileUpload = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const fileUploadAndResize = (e) => {
        let files = e.target.files

        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    console.log(uri)

                }, "base64")

            }
        }

    }
    return (
        <div className="row">
            <label className="btn btn-primary">Choose File
                <input type="file" hidden multiple accept="images/*" onChange={fileUploadAndResize} />
            </label>
        </div>
    )
}

export default FileUpload
