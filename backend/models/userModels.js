import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, index: true },
    role: { type: String, default: 'subscriber' },
    cart: { type: Array, default: [] },
    address: String,
    // wishList: [{type: ObjectId, ref: 'Product'}],
}, {
    timeStamps: true
}
)


const User = mongoose.model('User', userSchema)

export default User