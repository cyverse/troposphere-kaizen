import React from 'react';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';

const styles = {
    paper: {
        height: '28px',
        position: 'relative',
        marginBottom: '8px',
        // width: '100%'
    },
    table: {
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.54)',
        lineHeight: '28px'
    }
};

export default createReactClass({
    displayName: 'ListHeader',

    render: function () {
        return (
            <Paper style={styles.paper}>
                <div className="row" style={styles.table}>
                    <div className="col-md-6 col-lg-4">
                        <div style={{ paddingLeft: '16px' }}>
                            Name
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                        Summary
                    </div>
                    <div className="col-md-4 col-lg-3">
                        Resources
                    </div>
                    <div className="col-md-2 col-lg-1" />
                </div>
            </Paper>
        );
    }

});
