import PropTypes from 'prop-types';
import { Progress } from 'rsuite';


const FillProgressPump = ({ data }) => {
    let color;
    if (data < 1) {
        color = '#ff4d4f';
    }
    if (data < 2 && data > 1) {
        color = '#1890ff';
    }
    if (data <= 3.9 && data >= 2) {
        color = '#52c41a';
    }
    if (data >= 4 && data < 6) {
        color = '#faad14';
    }
    if (data >= 6 && data < 7) {
        color = '#ff4d4f';
    }
    if (data > 7) {
        color = 'black';
    }

    return <Progress.Circle percent={data ? data : 0} strokeColor={color ? color : '#1890ff'} />;
};

FillProgressPump.propTypes = {
    data: PropTypes.object,
    type: PropTypes.object,
};

export default FillProgressPump;