import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';
import moment from 'moment';

export default connect(function(getState, props) {
    const { instance } = props;

    return {
        instanceHistories: getState('instanceHistory.find', {
            where: {
                instance: instance.id
            }
        })
    }
})(
createReactClass({
    displayName: 'InstanceHistory',

    propTypes: {
        instanceHistories: PropTypes.object.isRequired
    },

    render: function () {
        const { instanceHistories } = this.props;

        if (instanceHistories.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <h1>Instance History</h1>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                                <TableHeaderColumn>Start Date</TableHeaderColumn>
                                <TableHeaderColumn>End Date</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>...</TableRowColumn>
                                <TableRowColumn>...</TableRowColumn>
                                <TableRowColumn>...</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            );
        }

        return (
            <div>
                <h1>Instance History</h1>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Start Date</TableHeaderColumn>
                            <TableHeaderColumn>End Date</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {instanceHistories.data.map((instanceHistory) => {
                            const { start_date, end_date } = instanceHistory.data;

                            return (
                                <TableRow key={instanceHistory.id}>
                                    <TableRowColumn>{instanceHistory.data.status}</TableRowColumn>
                                    <TableRowColumn>{moment(start_date).format('MMM DD YYYY, h:mm a')}</TableRowColumn>
                                    <TableRowColumn>{end_date ? moment(end_date).format('MMM DD YYYY, h:mm a') : 'Present'}</TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
})
);
