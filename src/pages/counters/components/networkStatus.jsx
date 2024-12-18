import { Tooltip } from '@mui/material';
import React from 'react';
import { WifiStatus, WifiStatusType } from 'react-wifi-status-indicator';

const DBMToSignalStrength = (dBm) => {
    if ((typeof dBm !== 'string' && typeof dBm !== 'number') || dBm === '') {
        return [WifiStatusType.Searching, `Searching for connections`];
    }

    const num = Number.isFinite(dBm) ? dBm : Number(dBm);

    const mult = 1;
    if (num >= -60 * mult) {
        return [WifiStatusType.Excellent, `Signal: Excellent (${num} dBm)`];
    }
    if (num >= -70 * mult) {
        return [WifiStatusType.Good, `Signal: Good (${num} dBm)`];
    }
    if (num >= -90 * mult) {
        return [WifiStatusType.Fair, `Signal: Medium (${num} dBm)`];
    }
    if (num >= -110 * mult) {
        return [WifiStatusType.Poor, `Signal: Bad (${num} dBm)`];
    }
    if (num >= -135 * mult) {
        return [WifiStatusType.Unavailable, `Device is unavailable`];
    }

    return [WifiStatusType.Error, 'Connection error'];
};

const NetworkStatus = (props) => {
    const [signal, text] = DBMToSignalStrength(props?.props);
    return (
        <Tooltip title={text} placement="bottom-start">
            <b>
                <WifiStatus status={signal} width={20} />
            </b>
        </Tooltip>
    );
};

export default NetworkStatus;
