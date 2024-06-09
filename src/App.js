import React, {Component} from 'react'
import Header from './components/Header'
import MenuTabs from './components/MenuTabs'
import MenuItem from './components/MenuItem'
import DishQuantityContext from './context/DishQuantityContext'
import './App.css'

class App extends Component {
  state = {
    activeMenuTabList: [],
    tableMenuList: [],
    initialCategoryId: '11',
    restaurantName: '',
    dishQuantities: {},
    cartCount: 0,
  }

  componentDidMount() {
    this.fetchDataFromServer()
  }

  initializeDishQuantities = tableMenuList => {
    const dishQuantities = {}
    tableMenuList.forEach(tableItem => {
      tableItem.categoryDishes.forEach(dish => {
        dishQuantities[dish.dishId] = 0
      })
    })
    return dishQuantities
  }

  fetchDataFromServer = async () => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e',
      )
      const data = await response.json()
      this.processRestaurantData(data[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  processRestaurantData = restaurantData => {
    const formattedRestaurantDetails =
      this.formatRestaurantDetails(restaurantData)
    const {tableMenuList, restaurantName} = formattedRestaurantDetails
    const {initialCategoryId} = this.state

    const activeMenuTabList = tableMenuList.filter(
      tableItem => tableItem.menuCategoryId === initialCategoryId,
    )

    const dishQuantities = this.initializeDishQuantities(tableMenuList)

    this.setState({
      activeMenuTabList,
      tableMenuList,
      restaurantName,
      dishQuantities,
    })
  }

  formatRestaurantDetails = restaurant => ({
    branchName: restaurant.branch_name,
    restaurantId: restaurant.restaurant_id,
    restaurantImg: restaurant.restaurant_image,
    restaurantName: restaurant.restaurant_name,
    tableId: restaurant.table_id,
    tableName: restaurant.table_name,
    tableMenuList: restaurant.table_menu_list.map(this.formatTableMenuItem),
  })

  formatTableMenuItem = tableItem => ({
    categoryDishes: tableItem.category_dishes.map(this.formatDishItem),
    menuCategory: tableItem.menu_category,
    menuCategoryId: tableItem.menu_category_id,
    menuCategoryImage: tableItem.menu_category_image,
  })

  formatDishItem = dishItem => ({
    addonCat: dishItem.addonCat.map(this.formatAddonItem),
    dishAvailability: dishItem.dish_Availability,
    dishType: dishItem.dish_Type,
    dishCalories: dishItem.dish_calories,
    dishCurrency: dishItem.dish_currency,
    dishDescription: dishItem.dish_description,
    dishId: dishItem.dish_id,
    dishImage: dishItem.dish_image,
    dishName: dishItem.dish_name,
    dishPrice: dishItem.dish_price,
  })

  formatAddonItem = addonItem => ({
    addonCategory: addonItem.addon_category,
    addonCategoryId: addonItem.addon_category_id,
    addonSelection: addonItem.addon_selection,
    addons: addonItem.addons.map(this.formatAddon),
  })

  formatAddon = addon => ({
    dishAvailability: addon.dish_Availability,
    dishType: addon.dish_Type,
    dishCalories: addon.dish_calories,
    dishCurrency: addon.dish_currency,
    dishDescription: addon.dish_description,
    dishId: addon.dish_id,
    dishImage: addon.dish_image,
    dishName: addon.dish_name,
    dishPrice: addon.dish_price,
  })

  updateActiveCategory = activeTabId => {
    const {tableMenuList} = this.state
    const activeMenuTabList = tableMenuList.filter(
      tableItem => tableItem.menuCategoryId === String(activeTabId),
    )
    this.setState({activeMenuTabList, initialCategoryId: activeTabId})
  }

  updateDishQuantity = (dishId, increment) => {
    this.setState(prevState => {
      const updatedQuantities = {...prevState.dishQuantities}
      const currentQuantity = updatedQuantities[dishId]

      if (increment) {
        updatedQuantities[dishId] = currentQuantity + 1
      } else if (currentQuantity > 0) {
        updatedQuantities[dishId] = currentQuantity - 1
      }

      const currentCartCount = Object.values(updatedQuantities).reduce(
        (acc, qty) => acc + qty,
        0,
      )

      return {
        dishQuantities: updatedQuantities,
        cartCount: currentCartCount,
      }
    })
  }

  render() {
    const {
      activeMenuTabList,
      tableMenuList,
      initialCategoryId,
      restaurantName,
      dishQuantities,
      cartCount,
    } = this.state
    return (
      <DishQuantityContext.Provider
        value={{
          dishQuantities,
          cartCount,
          updateDishQuantity: this.updateDishQuantity,
        }}
      >
        <Header restaurantName={restaurantName} cartCount={cartCount} />
        <MenuTabs
          updateActiveCategory={this.updateActiveCategory}
          initialCategoryId={initialCategoryId}
          tableMenuList={tableMenuList}
        />
        <div className="menu-list-container">
          {activeMenuTabList.length > 0 ? (
            <ul className="active-menu-list">
              {activeMenuTabList[0].categoryDishes.map(categoryDish => (
                <MenuItem
                  key={categoryDish.dishId}
                  categoryDish={categoryDish}
                  dishQuantity={dishQuantities[categoryDish.dishId] || 0}
                />
              ))}
            </ul>
          ) : (
            <p>No items available</p>
          )}
        </div>
      </DishQuantityContext.Provider>
    )
  }
}

export default App
