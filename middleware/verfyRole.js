const verifyRole = (allowedRole) => {
    return (req, res, next) => {
        if (!req?.role) return res.status(401).json({ 'message': 'Unauthorized' });

        if (req.role !== allowedRole) return res.status(401), res.json({ 'message': 'Unauthorized' });
        next();
    }
}

module.exports = verifyRole;