import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        },
        products:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:'products'
                },
                quantity:{
                    type: Number ,
                    required:true
                }
            } 
        ],
        address:{
            type:String,
            required:true
        },
        paymentMethod:{
            type:String,
            required:true
        },
        shippingPrice:{
            type:Number,
            required:true
        },
        totalPrice:{
            type:Number,
            required:true
        },
        status:{
            type:Number,
            required:true,
            default:1
        },
        paidAt:{
            type:Number,
        },
        orderedAt:{
            type:Number,
        },
        deliveredAt:{
            type:Number
        }

    
},{
    timestamps: true,
})

const Orders = mongoose.model('orders', orderSchema)

export default Orders