import React from 'react';
import createReactClass from 'create-react-class';
import ListHeader from '../images-search/_common/ListHeader';

export default createReactClass({
    displayName: 'ListHeader',

    render: function () {
        return (
            <ListHeader>
                <div>
                    <div style={{ position: 'absolute', left: '8px' }}>
                        Name
                    </div>
                    <div style={{ position: 'absolute', left: '25%' }}>
                        URL
                    </div>
                    <div style={{ position: 'absolute', left: '60%' }}>
                        Description
                    </div>
                </div>
            </ListHeader>
        );
    }

});
