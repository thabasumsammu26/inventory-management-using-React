import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [editingProduct, setEditingProduct] = useState(null);

    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(function () {

        const savedProducts =
            JSON.parse(localStorage.getItem("products"));

        const savedRevenue =
            JSON.parse(localStorage.getItem("revenue"));

        if (savedProducts) {

            setProducts(savedProducts);

        }

        if (savedRevenue) {

            setTotalRevenue(savedRevenue);

        }

    }, []);

    useEffect(function () {

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        localStorage.setItem(
            "revenue",
            JSON.stringify(totalRevenue)
        );

    }, [products, totalRevenue]);

    function addProduct(newProduct) {

        setProducts(function(previousProducts) {

            return [
                ...previousProducts,
                newProduct
            ];

        });

    }

    function deleteProduct(id) {

        const updatedProducts =
            products.filter(
                function(product) {

                    return product.id !== id;

                }
            );

        setProducts(updatedProducts);

    }

    function editProduct(product) {

        setEditingProduct(product);

    }

    function updateProduct(updatedProduct) {

        const updatedProducts =
            products.map(
                function(product) {

                    if (
                        product.id ===
                        updatedProduct.id
                    ) {

                        return updatedProduct;

                    }

                    return product;

                }
            );

        setProducts(updatedProducts);

        setEditingProduct(null);

    }

    function sellProduct(id) {

        const updatedProducts =
            products.map(
                function(product) {

                    if (
                        product.id === id &&
                        Number(product.quantity) > 0
                    ) {

                        setTotalRevenue(
                            function(previousRevenue) {

                                return (
                                    previousRevenue +
                                    Number(product.price)
                                );

                            }
                        );

                        return {

                            ...product,

                            quantity:
                                Number(product.quantity) - 1

                        };

                    }

                    return product;

                }
            );

        setProducts(updatedProducts);

    }

    function downloadReport() {

        let csvContent =
            "ID,Name,Category,Quantity,Price\n";

        products.forEach(
            function(product) {

                csvContent +=
                    product.id + "," +
                    product.name + "," +
                    product.category + "," +
                    product.quantity + "," +
                    product.price + "\n";

            }
        );

        const blob =
            new Blob(
                [csvContent],
                {
                    type: "text/csv"
                }
            );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "inventory_report.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    }

    const filteredProducts =
        products.filter(
            function(product) {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesCategory =
                    selectedCategory === "All" ||
                    product.category ===
                    selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );

    return (

        <div>

            <Navbar />

            <Dashboard
                products={products}
                totalRevenue={totalRevenue}
            />

            <ProductForm
                addProduct={addProduct}
                editingProduct={editingProduct}
                updateProduct={updateProduct}
            />

            <div
                style={{
                    margin: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={function(event) {

                        setSearchTerm(
                            event.target.value
                        );

                    }}
                />

                <select
                    value={selectedCategory}
                    onChange={function(event) {

                        setSelectedCategory(
                            event.target.value
                        );

                    }}
                >

                    <option value="All">
                        All Categories
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Stationery">
                        Stationery
                    </option>

                </select>

                <button
                    onClick={downloadReport}
                >
                    Download Report
                </button>

            </div>

            <ProductList
                products={filteredProducts}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
                sellProduct={sellProduct}
            />

        </div>

    );

}

export default App;