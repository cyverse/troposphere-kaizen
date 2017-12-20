import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { FormSection } from 'lore-react-forms';
import { result as _result } from 'lore-utils';

export default createReactClass({
    displayName: 'SchemaFields',

    propTypes: {
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        fields: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
    },

    render: function () {
        const {
            schema,
            fieldMap,
            form,
            fields
        } = this.props;

        return (
            <FormSection data={form.data} onChange={form.onChange} errors={form.errors}>
                {schema.fields(form)(
                    _.keys(fields).map((key, index) => {
                        const field = fields[key];
                        const mappedField = fieldMap[field.type];
                        return (
                            React.cloneElement(schema.field(form)(
                                mappedField(form, _result(field.props, form), key)
                            ), {
                                key: key
                            })
                        );
                    })
                )}
            </FormSection>
        );
    }

});
