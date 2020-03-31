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
    }
}
