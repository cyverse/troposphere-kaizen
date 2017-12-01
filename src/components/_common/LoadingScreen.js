import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
    displayName: 'LoadingScreen',

    render: function () {
        return (
            <div>
                <img className="logo" src="data:image/png;base64,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"/>
                <div className="loading-overlay"/>
            </div>
        );
    }

});
