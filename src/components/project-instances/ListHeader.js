import React from 'react';
import createReactClass from 'create-react-class';
import ListHeader from '../images-search/_common/ListHeader';

export default createReactClass({
    displayName: 'ListHeader',

    render: function () {
        return (
            <ListHeader>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div style={{ paddingLeft: '16px' }}>
                            Name
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-2">
                        Status
                    </div>
                    <div className="d-none d-lg-block col-lg-1">
                        Size
                    </div>
                    <div className="d-none d-lg-block col-lg-2">
                        Provider
                    </div>
                    <div className="col-md-2 col-lg-3" />
                </div>
            </ListHeader>
        );
    }

});
