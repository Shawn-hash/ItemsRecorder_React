import React, { useState } from 'react';
import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../reducers/quantityCount';
import { decrementQuantity, incrementQuantity} from '../actions/changeQuantity';


const Card = ({ item, onDelete }) => {
  let [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantityCount.quantities[item.name] || 0);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = () => {
    onDelete(item.name);
  };

  if (!item || !item.name || !item.description || !item.price || !item.image) {
     return null;
  }

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.name));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.name));
  };

  return (
    <div className="card">
      <span className="close-btn" onClick={handleDelete}>×</span>
      <img src={item.image} alt={item.name} />
      <div className="card-content">
        <h3>{item.name}</h3>
      </div>
      <div className="quantity">
          <button className="quantity-btn" onClick={handleDecrement}>-</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={handleIncrement}>+</button>
      </div>
      {!showPopup && <button onClick={handleCardClick}>Expand</button>}
      {showPopup && <Popup item={item} onClose={handleClosePopup} />}
    </div>
  );
};

export default Card;