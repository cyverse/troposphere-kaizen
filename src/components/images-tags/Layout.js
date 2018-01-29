import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Header from './Header';
import SearchBar from './SearchBar';
import Tags from './Tags';
import FloatingActionButton from './FloatingActionButton';
import CreateTagDialog from '../../dialogs/tag/create';
import IsStaff from '../_common/IsStaff';

const styles = {
    container: {
        position :'relative'
    },
    page: {
        paddingTop: '32px'
    }
};

export default createReactClass({
    displayName: 'Layout',

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
        const { location } = this.props;
        const { user } = this.context;

        return (
            <div className="container" style={styles.container}>
                <IsStaff>
                    <FloatingActionButton
                        onClick={() => {
                            lore.dialog.show(() => {
                                return (
                                    <CreateTagDialog />
                                );
                            });
                        }}
                    />
                </IsStaff>
                <div style={styles.page}>
                    <Header />
                    <SearchBar onSearch={this.onSearch} />
                    <Tags query={{ search: location.query.search }}/>
                </div>
            </div>
        );
    }

});
