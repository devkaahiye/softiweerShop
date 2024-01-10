import Orders from "../models/ordersModel.js";
import Product from "../models/productsModel.js";
import Users from "../models/userModel.js";


export const getOrders = async(req, res)=>{
    try {

        const orders = await Orders.find().sort({createdAt:-1}).populate("user")
        .populate("products.product");
        res.status(200).json(orders)
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}


export const getRecentOrders = async(req, res)=>{
    try {

        const orders = await Orders.find().sort({createdAt:-1}).limit(30).populate("user")
        .populate("products.product");
        res.status(200).json(orders)
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}


export const getMyOrders = async(req, res)=>{
    try {

        const orders = await Orders.find({user:req.params.id}).populate("user")
        .populate("products.product");
        res.status(200).json(orders)
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}



export const addOrdersItems = async(req, res)=>{
    try {

        const { userid, products, address, paymentMethod, totalPrice,shippingPrice,  } =req.body;

        let productsList = []

        for (let index = 0; index < products.length; index++) {
            const product = await Product.findById(products[index].product._id)
            if (product) {
                productsList.push({product,quantity: products[index].quantity })
                
            }else{
                res.status(400).json({ message: "Product not found" });
            }
            
        }

       

        const order = await Orders.create({
            user:userid,
            products : productsList ,
            address,
            paymentMethod,
            shippingPrice,
            totalPrice,
            status:1,
            orderedAt: new Date.getTime(),
        })

        await order.save()

        if (order) {
            const user = await Users.findById(userid);
            if (user) {
    
                user.cart = []
                await user.save()
            }
        }

        res.status(201).json(order);

       
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}