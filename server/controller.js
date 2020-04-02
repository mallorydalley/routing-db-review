module.exports = {
    addProduct: (req, res) => {
        const db = req.app.get('db')
        const {product_name, price, image} = req.body
        db.create_product([product_name, price, image]).then(products => {
            res.status(200).send(products)
        })
    },
    getProducts: (req, res) => {
        const db = req.app.get('db')
        db.get_products().then(products => {
            res.status(200).send(products)
        })
    },
    delete: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_product(id).then(products => {
            res.status(200).send(products)
        })
    },
    getOneProduct: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_one_product(+id)    //if you want a number instead of a string add '+'
        .then(result => {
            res.status(200).send(result)
        })
        .catch((err => res.status(500).send(err)))
    },
    update: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {product_name, price, image} = req.body
        db.update_product([product_name, +price, image, +id]) //put in order the way it's written in update_product.sql cuz we used $1 in that
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    }
}
