import React, { useEffect, useState } from "react";
import EditProductModal from "./Modal";

const ProductList = ({ onDelete, refreshTrigger, setRefreshTrigger }) => {
    const [products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });

    const sortData = (data, key, direction) => {
        return [...data].sort((a, b) => {
            let compareA = a[key];
            let compareB = b[key];

            // Verifica se a chave é 'price' ou 'quantity' e converte os valores para números
            if (key === "price" || key === "quantity") {
                compareA = parseFloat(compareA);
                compareB = parseFloat(compareB);
                // Aqui foi feito um ajuste para lowercase na comparação de nomes para funcionamento correto do filtro
            } else if (key === "name") {
                compareA = compareA.toLowerCase();
                compareB = compareB.toLowerCase();
            }

            if (compareA < compareB) return direction === "ascending" ? -1 : 1;
            if (compareA > compareB) return direction === "ascending" ? 1 : -1;
            return 0;
        });
    };

    useEffect(() => {
        fetch("http://localhost/backend/api/get_products.php")
            .then((response) => response.json())
            .then((data) => {
                const sortedData = sortData(
                    data,
                    sortConfig.key,
                    sortConfig.direction
                );
                setProducts(sortedData);
            });
    }, [refreshTrigger, sortConfig]);

    const sortProducts = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedProducts = sortData(products, key, direction);
        setProducts(sortedProducts);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? "▲" : "▼";
        }
        return "";
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedProduct) => {
        setIsEditModalOpen(false);
        setProducts(
            products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
            )
        ); // Atualiza o produto na lista de produtos
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleExport = () => {
        // Funcao para exportar os dados para o Excel
        window.location.href =
            "http://localhost/backend/api/export_products.php";
    };

    return (
        <div>
            <h2 className="title-produtos">Lista de Produtos</h2>
            <div className="container-produtos">
                <div className="export-div">
                    <button onClick={handleExport} className="export-button">
                        Exportar para Excel
                    </button>
                </div>
                <div>
                    <table className="tabela-produtos">
                        <thead>
                            <tr>
                                <th onClick={() => sortProducts("name")}>
                                    Nome {getSortIcon("name")}
                                </th>
                                <th onClick={() => sortProducts("price")}>
                                    inventory-system {getSortIcon("price")}
                                </th>
                                <th onClick={() => sortProducts("quantity")}>
                                    QTD {getSortIcon("quantity")}
                                </th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>R${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Voce tem certeza que deseja excluir este produto?", product.name
                                                    )
                                                ) {
                                                    onDelete(product.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isEditModalOpen && (
                    <EditProductModal
                        product={editingProduct}
                        onSave={handleSaveEdit}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductList;
