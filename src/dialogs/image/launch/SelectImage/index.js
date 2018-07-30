import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle, Paper } from 'material-ui';
import { Connect } from 'lore-hook-connect';
import validators from '../../../../utils/validators';
import CloseButton from '../../../_blueprints/_common/CloseButton';
import { GenericForm } from 'lore-react-forms';
import Images from '../../../../components/images-search/_common/Images';
import ImageBookmarks from '../../../../components/images-search-favorites/ImageBookmarks';
import BasicNavigation from '../_common/BasicNavigation';
import Image from './Image';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import TabValues from './TabValues';

export default createReactClass({
    displayName: 'SelectImage',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        request: PropTypes.object,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired
    },

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    getInitialState: function() {
        const { data } = this.props;

        return {
            data: _.merge({}, data),
            searchTerm: '',
            tabValue: 'all'
        }
    },

    onChange: function(name, value) {
        const nextState = _.merge({}, this.state);
        nextState.data[name] = value;

        if (name === 'image') {
            nextState.data.image_version = undefined;
        }

        this.setState(nextState);
    },

    onChangeTabValue(value) {
        this.setState({
            tabValue: value
        });
    },

    onSearch(searchTerm) {
        this.setState({
            searchTerm: searchTerm
        });
    },

    onSelectImage(image) {
        this.onChange('image', image.id);
    },

    renderImageListItem(image) {
        const { data } = this.state;

        return (
            <Image
                key={image.id || image.cid}
                image={image}
                isCheckable={!!data.image}
                checked={image.id === data.image}
                onCheck={() => {
                    this.onSelectImage(image);
                }}
            />
        );
    },

    render: function() {
        const {
            schema,
            fieldMap,
            actionMap,
            callbacks
        } = this.props;

        const { user } = this.context;

        const {
            data,
            searchTerm,
            tabValue
        } = this.state;

        return (
            <GenericForm
                data={data}
                onChange={this.onChange}
                callbacks={callbacks}
                validators={{
                    image: [validators.number.isRequired]
                }}
            >
                {(form) => (
                    <div className="row" style={{ margin: 0, backgroundColor: '#f2f2f2', height: '100%' }}>
                        <CloseButton onClick={callbacks.onCancel} />
                        <div className="col" style={{ backgroundColor: 'white' }}>
                            <BasicNavigation
                                schema={schema}
                                actionMap={actionMap}
                                form={form}
                                activeStep={1}
                                helpText="Select the image you want to launch"
                                nextButtonVisible={true}
                                previousButtonVisible={true}
                            />
                        </div>
                        <div className="col-8" style={{ overflow: 'scroll', height: '100%' }}>
                            <div className="row">
                                <div className="col">
                                    <CardTitle title="Image Selection" />
                                    {data.image ? (
                                        <Connect callback={(getState, props) => {
                                            return {
                                                image: getState('image.byId', {
                                                    id: data.image
                                                })
                                            };
                                        }}>
                                            {(props) => {
                                                const { image } = props;
                                                return (
                                                    <div>
                                                        <CardTitle
                                                            subtitle="Currently Selected Image"
                                                            style={{ paddingBottom: 0, marginBottom: -8 }}
                                                        />
                                                        <div style={{ padding: 16 }}>
                                                            <Paper>
                                                                <Image
                                                                    image={image}
                                                                    isSelectable={false}
                                                                />
                                                            </Paper>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Connect>
                                    ) : null}
                                    <div style={{ padding: 16 }}>
                                        <SearchBar onSearch={this.onSearch} />
                                        <Tabs
                                            user={user}
                                            query={{
                                                search: searchTerm
                                            }}
                                            tabValue={tabValue}
                                            onChange={this.onChangeTabValue}
                                        />
                                        {tabValue === TabValues.ALL ? (
                                            <Images query={{
                                                search: searchTerm
                                            }}>
                                                {this.renderImageListItem}
                                            </Images>
                                        ) : null}
                                        {tabValue === TabValues.FEATURED ? (
                                            <Images query={{
                                                tags__name: 'Featured',
                                                search: searchTerm
                                            }}>
                                                {this.renderImageListItem}
                                            </Images>
                                        ) : null}
                                        {tabValue === TabValues.FAVORITES ? (
                                            <ImageBookmarks query={{
                                                search: searchTerm
                                            }}>
                                                {this.renderImageListItem}
                                            </ImageBookmarks>
                                        ) : null}
                                        {tabValue === TabValues.MINE ? (
                                            <Images query={{
                                                created_by__username: user.data.username,
                                                search: searchTerm
                                            }}>
                                                {this.renderImageListItem}
                                            </Images>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GenericForm>
        );
    }

});
