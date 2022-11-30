import PropTypes from 'prop-types';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Card, Col } from 'antd';

const ListWapper = ({ children }) => {
    return (
        <div className='user-pages'>
            <AppAnimateGroup type='bottom'>
                <div className='user-container' key='a'>
                    <Card className='user-card user-card-lg'>
                        <AppRowContainer>
                            <Col xs={24} md={24}>
                                {children}
                            </Col>
                        </AppRowContainer>
                    </Card>
                </div>
            </AppAnimateGroup>
        </div>
    );
};

ListWapper.propTypes = {
    children: PropTypes.any,
};
export default ListWapper;