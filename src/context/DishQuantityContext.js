import React from 'react'

const DishQuantityContext = React.createContext({
  dishQuanity: 0,
  updatedDishQuantity: () => {},
  cartQuantity: 0,
})

export default DishQuantityContext
