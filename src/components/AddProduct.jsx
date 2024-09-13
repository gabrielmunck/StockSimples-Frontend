import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(name, price, quantity);
        setName("");
        setPrice("");
        setQuantity("");
        setShowForm(false);
    };

    const validateNumber = (value) => {
        return /^\d*\.?\d*$/.test(value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (validateNumber(value)) {
            setPrice(value);
        }
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (validateNumber(value)) {
            setQuantity(value);
        }
    };

    return (
        <div className="add-produto-container">
            {!showForm ? (
                <button className="add-produto-button" onClick={() => setShowForm(true)}>
                    Adicionar Produto
                </button>
            ) : (
                <div className="add-produto">
                    <div className="add-produto-content">
                        <h2>Adicionar Novo Produto</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nome do Produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Preço"
                                value={price}
                                onChange={handlePriceChange}
                                required
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Quantidade"
                                value={quantity}
                                onChange={handleQuantityChange}
                                required
                            />
                            <button type="submit">Adicionar</button>
                            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AddProduct;