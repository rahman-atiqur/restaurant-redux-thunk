import React, { Component } from "react";
import { connect } from "react-redux";

class MenuItems extends Component {
    render() {
        return (
            <div className="right">
                <h2>Items in Category:({this.props.categoryFromStore})</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="name">Name</th>
                            <th className="desc">Description</th>
                            <th className="price">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itemsFromStore.map((item, index) => {
                            const { name, description, price_small, price_large } = item;
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{description}</td>
                                    <td className="price fs">Small: ${price_small}<br></br>Large: ${price_large}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (store) => ({
    itemsFromStore: store.menuItems,
    categoryFromStore: store.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
