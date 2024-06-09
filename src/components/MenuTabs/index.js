import {Component} from 'react'

import './index.css'

class MenuTabs extends Component {
  // handle when clicked on menu item
  onClickMenuItem = e => {
    const {updateActiveCategory} = this.props
    updateActiveCategory(e.target.id)
  }

  render() {
    const {initialCategoryId, tableMenuList} = this.props
    return (
      <ul className="menu-list">
        {tableMenuList.map(menuItem => (
          <li key={menuItem.menuCategoryId} className="menu-list-item">
            <button
              type="button"
              onClick={this.onClickMenuItem}
              className={`menu-item-button ${
                initialCategoryId === menuItem.menuCategoryId &&
                'activeTabButton'
              }`}
              value={menuItem.menuCategory}
              id={menuItem.menuCategoryId}
            >
              {menuItem.menuCategory}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default MenuTabs
