import React, { Component } from "react";
import { connect } from "react-redux";

const GET_MENU_ITEMS_SUCCESS = "GET_MENU_ITEMS_SUCCESS";
const GET_MENU_CATEGORY_NAME = "GET_MENU_CATEGORY_NAME";

class MenuCategories extends Component {
    handleFilter = (short_name) => {
        const filterItems = this.props.allItemsFromStore.filter((item) => {
            return item.short_name.slice(0, short_name.length) === short_name;
        });

        this.props.getMenuItems(filterItems, short_name);
    };

    render() {
        return (
            <div className="left">
                <h1>Menu Categories</h1>
                <ul>
                    {this.props.categoriesFromStore.map((item, index) => (
                        <li key={index}>
                            <a href="#href" onClick={() => this.handleFilter(item.short_name)}>
                                {item.name}-({item.short_name})
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMenuItems: function (menuItems, category) {
            dispatch({ type: GET_MENU_ITEMS_SUCCESS, payload: menuItems });
            dispatch({ type: GET_MENU_CATEGORY_NAME, payload: category });
        },
    };
};

const mapStateToProps = (store) => ({
    categoriesFromStore: store.categories,
    allItemsFromStore: store.allItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);
