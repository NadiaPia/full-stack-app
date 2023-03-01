const {verify} = require("jsonwebtoken"); //this function will clarify the correct data
//this function will run before we made a request to validate if the user is authenticated

const validateToken = (req, res, next) => {        //next() //meens we want to move forward
    
    const accessToken = req.header("accessToken") //req.header("accessToken")should have a value of the actual sessionStorage
    if (!accessToken) return res.json({error: "User not logged in!"});

    try {
        const validToken = verify(accessToken, "importantsecret") //verify is the func from jsonwebtoken library it  will clarify the correct data
        //console.log("validTokenvalidTokenvalidTokenvalidToken", validToken)
        req.user = validToken; //push a new key to our req: as we unhashed accessToken that came from the FE now we have username and userid and we can now put it inside our request and now our req contains commentBody{}, header{}, user{}
        if (validToken) {
                return next();
            }
    } catch (err) {
        return res.json({error: err});
    }

}

module.exports = {validateToken};