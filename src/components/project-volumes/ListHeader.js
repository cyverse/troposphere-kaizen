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
                    <div style={{ position: 'absolute', left: '30%' }}>
                        Status
                    </div>
                    <div style={{ position: 'absolute', left: '50%' }}>
                        Size
                    </div>
                    <div style={{ position: 'absolute', left: '65%' }}>
                        Provider
                    </div>
                </div>
            </ListHeader>
        );
    }

});
