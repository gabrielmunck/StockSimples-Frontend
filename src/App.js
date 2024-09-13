import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import "./App.css";

function App() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);


  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle('night-mode');
  };

  const addProduct = (name, price, quantity) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);

    fetch("http://localhost/backend/api/add_product.php", {
      method: "POST",
      body: formData,
    }).then(() => {
      setRefreshTrigger(prev => prev + 1);
    });
  };

  const deleteProduct = (id) => {
    const formData = new FormData();
    formData.append('id', id);

    fetch('http://localhost/backend/api/delete_product.php', {
      method: 'POST',
      body: formData,
    }).then(() => {
      setRefreshTrigger(prev => prev + 1);
    });
  }

  return (
    <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
      <div className='header'>
        <img src="/Boxsvg.svg" alt="Logo" className="logo" />
        <h1 className='titulo'>StockSimples</h1>
      </div>
      <button className="night-mode-toggle" onClick={toggleNightMode}>
        {isNightMode ? 'Light Mode' : 'Night Mode'}
      </button>
      <AddProduct onAdd={addProduct} refreshTrigger={refreshTrigger} />
      <ProductList onDelete={deleteProduct} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
    </div>
  );
}

export default App;