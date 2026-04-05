export default function isAuthorized(req, res, next) {
    if (!req.session?.employee) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    return next()
}