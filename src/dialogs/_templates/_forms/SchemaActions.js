import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { FormSection } from 'lore-react-forms';
import { result as _result } from 'lore-utils';

export default createReactClass({
    displayName: 'SchemaActions',

    propTypes: {
        schema: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
        actions: PropTypes.array.isRequired,
        form: PropTypes.object.isRequired,
    },

    render: function () {
        const {
            schema,
            actionMap,
            form,
            actions
        } = this.props;

        return (
            <FormSection>
                {schema.actions(form)(
                    actions.map((action, index) => {
                        const mappedAction = actionMap[action.type];
                        return (
                            React.cloneElement(schema.action(form)(
                                mappedAction(form, _result(action.props, form))
                            ), {
                                key: index
                            })
                        );
                    })
                )}
            </FormSection>
        );
    }

});
