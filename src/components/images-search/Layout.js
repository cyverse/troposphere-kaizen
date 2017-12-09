import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Header from './Header';
import SearchBar from './SearchBar';
import Tabs from './Tabs';

export default createReactClass({
    displayName: 'Layout',

    propTypes: {
        children: PropTypes.node.isRequired
    },

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    onSearch: function(searchTerm) {
        const {
            router,
            location
        } = this.props;

        router.push({
            pathname: location.pathname,
            query: _.merge({}, location.query, {
                search: searchTerm
            })
        });
    },

    render: function () {
        const { children } = this.props;
        const { user } = this.context;

        return (
            <div className="container">
                <div style={{ paddingTop: '32px' }}>
                    <Header />
                    <SearchBar onSearch={this.onSearch} />
                    <Tabs user={user} />
                    {children? React.cloneElement(children) : null}
                </div>
            </div>
        );
    }

});
