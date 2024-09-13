import React, { useState, useEffect } from "react";
import "./Modal.css";

const EditProductModal = ({ product, onSave, onClose }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { ...product, name, price, quantity };

        const formData = new FormData();
        formData.append("id", product.id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", quantity);

        fetch("http://localhost/backend/api/get_products.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    onSave(updatedProduct);
                } else {
                    console.error("Falha ao atualizar o produto.");
                }
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edite as Informações do Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input
                        className="input-nome"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                    />

                    <label>Preço:</label>
                    <input
                        className="input-numeros"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Preço"
                    />
                    <label>Quantidade:</label>
                    <input
                        className="input-numeros"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantidade"
                    />

                    <div className="button-container">
                        <button
                            type="submit"
                            className="modal-button save-button"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="modal-button cancel-button"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;