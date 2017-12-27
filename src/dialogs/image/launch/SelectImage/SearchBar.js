import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { SearchBar } from 'cyverse-ui';
import { withRouter } from 'react-router';

export default withRouter(createReactClass({
    displayName: 'SearchBar',

    propTypes: {
        onSearch: PropTypes.func.isRequired
    },

    getInitialState: function() {
        this.onSearch = _.debounce(this.onSearch, 250);
        return {
            search: ''
        }
    },

    onChange: function(e) {
        const value = e.target.value;
        this.setState({
            search: value
        });
        this.onSearch(value);
    },

    onSearch: function(searchTerm) {
        const { onSearch } = this.props;
        onSearch(searchTerm);
    },

    render: function() {
        const {search} = this.state;

        return (
            <SearchBar
                placeholder="Search Images"
                value={search}
                onChange={this.onChange}
            />
        );
    }

}));
