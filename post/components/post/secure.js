const auth = require('../../../auth')

module.exports = function checkAuth(action) {
    function middlewae(req, res , next) {
        switch (action) {
            case 'upsert':
                const owner = req.body.id
                auth.check.own(req, owner)
                next();
                break;

            
            case 'follow':
                auth.check.logged(req)
                next();
                break;
        
            default:
                next()
        }
    }

    return middlewae
}