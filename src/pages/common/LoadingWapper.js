import { AppLoader } from '../../@crema';
import { Card } from 'antd';

const LoadingWapper = () => {
    return (
        <Card>
            <AppLoader />
        </Card>
    );
};
export default LoadingWapper;