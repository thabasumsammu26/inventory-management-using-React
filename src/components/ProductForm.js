import { useState, useEffect } from "react";

import "../css/ProductForm.css";

function ProductForm({
    addProduct,
    editingProduct,
    updateProduct
}) {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    useEffect(function () {

        if (editingProduct) {

            setId(editingProduct.id);
            setName(editingProduct.name);
            setCategory(editingProduct.category);
            setQuantity(editingProduct.quantity);
            setPrice(editingProduct.price);

        }

    }, [editingProduct]);

    function handleSubmit(event) {

        event.preventDefault();

        const product = {

            id: id ? id : Date.now(),

            name: name,

            category: category,

            quantity: quantity,

            price: price

        };

        if (editingProduct) {

            updateProduct(product);

        } else {

            addProduct(product);

        }

        setId("");
        setName("");
        setCategory("");
        setQuantity("");
        setPrice("");

    }

    return (

        <div className="form-container">

            <h2>Product Form</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={function (event) {

                        setName(event.target.value);

                    }}
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={function (event) {

                        setCategory(event.target.value);

                    }}
                    required
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={function (event) {

                        setQuantity(event.target.value);

                    }}
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={function (event) {

                        setPrice(event.target.value);

                    }}
                    required
                />

                <button type="submit">

                    {editingProduct
                        ? "Update Product"
                        : "Add Product"}

                </button>

            </form>

        </div>

    );

}

export default ProductForm;