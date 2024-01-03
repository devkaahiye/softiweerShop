import Product from "../models/productsModel.js";
import Users from "../models/userModel.js";

export const addToCart  = async(req, res) => {
    try{

        const {userId, productId} = req.body;

        const product = await Product.findById(productId);


        let user = await Users.findById(userId).populate("cart.product").populate("wishlist.product")
        if (user.cart.length == 0) {
            user.cart.push({product, quatity:1})
            
        }else{
            let isProductFound = false;
            for (let i=0;i<user.cart.length;i++){
                if (user.cart[i].product._id.equals(product._id)){
                    isProductFound = true;
                }
            }
            if (isProductFound) {
               let producttt = user.cart.find(pro=>
                pro.product._id.equals(product._id)
                );
                producttt.quatity++;

            }else{
                user.cart.push({product, quatity:1})
            }


        }


        user = user.save()
        res.status(200).json(user)

    }catch(e){
        res.status(500).json({ error: e.message });
    }

}





export const addToWishlist  = async(req, res) => {
    try{

        const {userId, productId} = req.body;

        const product = await Product.findById(productId);


        let user = await Users.findById(userId).populate("cart.product").populate("wishlist.product")
        if (user.wishlist.length == 0) {
            user.wishlist.push({product})
            
        }else{
            let isProductFound = false;
            for (let i=0;i<user.wishlist.length;i++){
                if (user.wishlist[i].product._id.equals(product._id)){
                    isProductFound = true;
                }
            }
            if (isProductFound) {
               res.status(400).json({message:"aleardy added"})

            }else{
                user.wishlist.push({product, quatity:1})
            }


        }


        user = user.save()
        res.status(200).json(user)

    }catch(e){
        res.status(500).json({ error: e.message });
    }

}