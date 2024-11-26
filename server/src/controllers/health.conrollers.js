export const health = (req, res, next) =>{
    return res.json({
        success: true,
        message: "Server is up and running"
    })
}