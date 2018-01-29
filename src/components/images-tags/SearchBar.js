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
        const { location } = this.props;

        this.onSearch = _.debounce(this.onSearch, 250);
        return {
            search: location.query.search || ''
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

    render: function() {
        const { search } = this.state;

        return (
            <SearchBar
                placeholder="Search Tags"
                value={search}
                onChange={this.onChange}
                onClear={() => {
                    this.onChange({
                        target: {
                            value: ''
                        }
                    })
                }}
            />
        );
    }

}));
