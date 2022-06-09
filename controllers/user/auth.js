import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import validator from "validator";
import { setCookies } from 'cookies-next';


/**
 * @method POST
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export const doLogin = async function (req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = req.body;

            if (!email || !password) {
                return resolve({ error: "Email and Password Required", status: 400 });
            }

            email = email.trim();
            password = password.trim();

            if (!validator.isEmail(email)) {
                return resolve({ error: "Invalid Email", status: 400 })
            }

        let cookies=setCookies('1', email);
        console.log(cookies);

            //const existingUser = await cookies.findOne({ email })

            if (!existingUser) {
                return resolve({ error: "User not found", status: 400 });
            }
            
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (result) {
                    const token = jsonwebtoken.sign({ id: existingUser._id }, process.env.JSON_SECRET, {
                        expiresIn: 2678400000 // 31 days
                    });
                    return resolve({ payload: { payload: token, user: existingUser, role: existingUser.role }, status: 200 })
                }

                return resolve({ error: "Password not matched", status: 400 });
            })

        } catch (e) {
            console.log(e);
            reject({ error: "Internal server error" })
        }
    })
}



/**
 * @method GET
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export const checkLogedIn = async function (req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            const token = req.headers.authorization;

            const ctoken = token.split(" ")[1];
            if (ctoken === "null") {
                return resolve({ payload: { logedin: false, user: {}, role: null }, status: 200 })
            }

            const { id } = jsonwebtoken.verify(ctoken, process.env.JSON_SECRET);

            const user = await User.findOne({ _id: id }).lean();

            if (!user) {
                return resolve({ payload: { logedin: false, user: {}, role: null }, status: 200 })
            }
            const accountDetails = await Account.findOne({
                [user.role === "client_admin" ? "client_admin" : user.role === "client_member" ? "client_members.userId" : user.role === "project_manager" ? "account_manager" : ""]: id
            })
            user["account_details"] = accountDetails;

            resolve({ payload: { logedin: true, user: user, role: user.role }, status: 200 });

        } catch (e) {
            if (e.name == "TokenExpiredError") {
                return resolve({ payload: { logedin: false, user: {}, role: null }, status: 200 });
            }
            reject({ error: "Internal server error!" });
        }
    })
}