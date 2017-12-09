import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'SkeletonText',

    render() {
        return (
            <div>
                <div
                    style={{
                        height: "10px",
                        width: "80%",
                        marginBottom: "10px",
                        background: "#EFEFEF",
                        borderRadius: "800px"
                    }}
                />
                <div
                    style={{
                        height: "10px",
                        width: "70%",
                        background: "#EFEFEF",
                        borderRadius: "800px"
                    }}
                />
            </div>
        )
    }
});
