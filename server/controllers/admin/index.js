

const adminRegister = async (req, res) => {
    try {
        console.log(req.body);
        // body ->name, email, password,address
        // database ->collegecode
        // auth middleware ->collegeId 
        
    } catch (error) {
        res.json({
            message: "",
            error: error
        });
    }
}

module.exports = {
    adminRegister,

}