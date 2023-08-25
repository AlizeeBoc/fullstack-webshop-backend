import User from "../Models/User.mjs"
export const authUser = async (req, res, next) => {
    
        const user = await User.findOne({email: email})
        if (!user) {
            res.status(403)
            return res.send('You need to sign in')
        }
    }
