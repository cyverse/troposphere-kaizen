import React from 'react';
import createReactClass from 'create-react-class';
import ListHeader from '../images-search/_common/ListHeader';

export default createReactClass({
    displayName: 'ListHeader',

    render: function () {
        return (
            <ListHeader>
                <div className="row">
                    <div className="col-md-5 col-lg-3">
                        <div style={{ paddingLeft: '16px' }}>
                            Name
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        URL
                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                        Description
                    </div>
                    <div className="col-md-1 col-lg-1 text-right" />
                </div>
            </ListHeader>
        );
    }

});
