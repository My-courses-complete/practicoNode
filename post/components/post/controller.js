const {nanoid} = require('nanoid')

const TABLA =  'post'

module.exports = function (injectedStore) {
    let store = injectedStore

    if(!store) store = require('../../../store/dummy')

    function list() {
        return store.list(TABLA)
    }

    const get = (id) => {
        return store.get(TABLA, id)
    }

    const upsert = async (body) => {
        const post = {
            text: body.text,
            user: body.user
        }

        body.id ? post.id = body.id : post.id = nanoid()
        console.log(post);
        return store.upsert(TABLA, post)
    }

    return {
        list,
        get,
        upsert
    }
}

