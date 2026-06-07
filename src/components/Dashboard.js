import "../css/Dashboard.css";

function Dashboard({
    products,
    totalRevenue
}) {

    const totalProducts =
        products.length;

    const lowStockProducts =
        products.filter(
            function(product) {

                return (
                    Number(product.quantity) < 10
                );

            }
        ).length;

    const totalInventoryValue =
        products.reduce(
            function(total, product) {

                return (
                    total +
                    (
                        Number(product.quantity) *
                        Number(product.price)
                    )
                );

            },
            0
        );

    return (

        <div className="dashboard">

            <h2>Dashboard</h2>

            <div className="cards">

                <div className="card">

                    <h3>Total Products</h3>

                    <p>
                        {totalProducts}
                    </p>

                </div>

                <div className="card">

                    <h3>Low Stock Products</h3>

                    <p>
                        {lowStockProducts}
                    </p>

                </div>

                <div className="card">

                    <h3>Total Inventory Value</h3>

                    <p>
                        ₹ {totalInventoryValue}
                    </p>

                </div>

                <div className="card">

                    <h3>Total Revenue</h3>

                    <p>
                        ₹ {totalRevenue}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;