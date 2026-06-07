import "../css/ProductList.css";

function ProductList({
    products,
    deleteProduct,
    editProduct,
    sellProduct
}) {

    return (

        <div className="product-list">

            <h2>Product List</h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map(function(product) {

                        return (

                            <tr key={product.id}>

                                <td>{product.id}</td>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>{product.quantity}</td>

                                <td>₹ {product.price}</td>

                                <td>

                                    {Number(product.quantity) < 10
                                        ? "⚠ Low Stock"
                                        : "In Stock"}

                                </td>

                                <td>

                                    <button
                                        onClick={function() {

                                            editProduct(product);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={function() {

                                            sellProduct(product.id);

                                        }}
                                    >
                                        Sell
                                    </button>

                                    {" "}

                                    <button
                                        onClick={function() {

                                            deleteProduct(product.id);

                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

}

export default ProductList;