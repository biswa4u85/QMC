import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import { Col } from 'antd';
import WelcomeCard from './WelcomeCard';
import StateCard from './StateCard';
import SalesState from './SalesState';
import VisitorPageView from './VisitorPageView';
import ActiveVisitors from './ActiveVisitors';
import TopSelling from './TopSelling';
import EarningByCountry from './EarningByCountry';
import TicketsSupport from './TicketsSupport';
import InfoWidget from './InfoWidget';
import PageVisits from './PageVisits';
import OrderNTransaction from './OrderNTransaction';
import TrafficSource from './TrafficSource';
import { AppInfoView } from '../../../@crema';
import { useDispatch } from 'react-redux';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';

const Analytics = () => {
  const dispatch = useDispatch();
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      setAnalyticsData(result.data)
    }
    fetchData();
  }, [])

  console.log(analyticsData)

  return (
    <>
      <AppPageMetadata title='Analytics Dashboard' />
      {analyticsData ? (
        <AppRowContainer interval={120} ease={'easeInSine'}>
          <Col xs={24} lg={12} className='mb-0' key={'a'}>
            <AppRowContainer interval={120}>
              <Col xs={24}>
                <WelcomeCard data={analyticsData.welcomeCard} />
              </Col>
              <Col xs={24} sm={12} key={'c'}>
                <StateCard data={analyticsData.revenueCards[0]} />
              </Col>
              <Col xs={24} sm={12} key={'d'}>
                <StateCard data={analyticsData.revenueCards[1]} />
              </Col>
            </AppRowContainer>
          </Col>
          <Col xs={24} lg={12} key={'e'}>
            <SalesState
              salesState={analyticsData.salesState}
              saleChartData={analyticsData.saleChartData}
            />
          </Col>
          <Col xs={24} lg={16} xxl={18} key={'f'}>
            <VisitorPageView data={analyticsData.visitorsPageView} />
          </Col>
          <Col xs={24} lg={8} xxl={6} key={'g'}>
            <ActiveVisitors data={analyticsData.activeVisitors} />
          </Col>
          <Col xs={24} lg={12} key={'h'}>
            <TopSelling products={analyticsData.topSellingProduct} />
          </Col>
          <Col xs={24} lg={12} key={'i'}>
            <EarningByCountry earningData={analyticsData.earningData} />
          </Col>
          <Col xs={24} lg={12} className='mb-0' key={'j'}>
            <AppRowContainer>
              <Col xs={24}>
                <TicketsSupport tickets={analyticsData.tickets} />
              </Col>
              {analyticsData.infoWidgets.map((data, index) => (
                <Col xs={24} sm={8} key={'l' + index}>
                  <InfoWidget data={data} />
                </Col>
              ))}
            </AppRowContainer>
          </Col>
          <Col xs={24} lg={12} key={'m'}>
            <PageVisits pageVisits={analyticsData.pageVisits} />
          </Col>
          <Col xs={24} lg={18} key={'n'}>
            <OrderNTransaction
              transactionData={analyticsData.transactionData}
            />
          </Col>
          <Col xs={24} lg={6} key={'o'}>
            <TrafficSource trafficData={analyticsData.trafficData} />
          </Col>
        </AppRowContainer>
      ) : null}

      {/* <AppInfoView /> */}
    </>
  );
};

export default Analytics;
