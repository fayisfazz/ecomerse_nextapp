import { NextApiRequest, NextApiResponse } from "next";
import{multerUploads} from "../../middlewares/multer"






export const addProduct=async function(req,res){


    return new Promise(async (resolve, reject) => {
        try {
            let { name, price } = req.body;

            if (!name || !price) {
                return resolve({ error: "Name and Price Required", status: 400 });
            }

}catch (error) {
    console.log(error);
}

})




}