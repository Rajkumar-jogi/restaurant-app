import React, {useContext} from 'react'
import DishQuantityContext from '../../context/DishQuantityContext'
import './index.css'

const MenuItem = ({categoryDish, dishQuantity}) => {
  const {
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishAvailability,
    dishId,
    addonCat,
  } = categoryDish

  const {updateDishQuantity} = useContext(DishQuantityContext)

  return (
    <li className="menu-item">
      <div className="dish-details">
        <h1 className="dish-name">{dishName}</h1>
        <div className="dish-price">
          <p>
            {dishCurrency} {dishPrice}
          </p>
        </div>
        <p>{dishDescription}</p>
        {dishAvailability ? (
          <>
            <div className="add-remove-buttons-container">
              <button
                type="button"
                className="dish-control-button"
                onClick={() => updateDishQuantity(dishId, false)}
                disabled={dishQuantity === 0}
              >
                -
              </button>
              <p>{dishQuantity}</p>
              <button
                type="button"
                className="dish-control-button"
                onClick={() => updateDishQuantity(dishId, true)}
              >
                +
              </button>
            </div>
            {addonCat && addonCat.length > 0 && (
              <p className="customizations-available">
                Customizations available
              </p>
            )}
          </>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>
      <div className="dish-calories">
        <p>{dishCalories} calories</p>
      </div>
      <div className="dish-image-container">
        <img src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default MenuItem
