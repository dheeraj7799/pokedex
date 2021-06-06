async function get(req, res) {
    try {
        const { id, name } = req.query;
        if (!id && !name) {
            return res.status(400).json({
                message: 'Id or Name is required',
            });
        }
        console.log(id, name);
        return res.status(200).json({
            message: 'Request successful',
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports = {
    get,
}