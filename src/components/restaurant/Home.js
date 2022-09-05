import React, { Component } from "react";
import { connect } from "react-redux";

import "./Style.css";
import MenuItems from "./MenuItems";
import MenuCategories from "./MenuCategories";

class Home extends Component {
    render() {
        return (
            <main>
                <header>
                    <h1>-: Restaurant App :-</h1>
                    <h3>[ .. ... by Redux-THUNK ... .. ]</h3>
                </header>
                
                <MenuCategories />
                {this.props.categoryFromStore.length > 0 && <MenuItems />}
            </main>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (store) => ({
    categoryFromStore: store.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
