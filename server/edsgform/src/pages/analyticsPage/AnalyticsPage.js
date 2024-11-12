import React from 'react';
import FilterPanel from './FilterPanel';
import StatsOverview from './StatsOverview';
import UserPerformanceTable from './UserPerformanceTable';
import ChartContainer from './ChartContainer';
import './AnalyticsPage.css';
import Header from '../../components/Header';

const AnalyticsPage = () => {
  return (
    <>
    <Header />
    <div className="analytics-page">
      <h1>Form/Quiz Analytics</h1>
      <FilterPanel />
      <StatsOverview />
      <UserPerformanceTable />
      <ChartContainer />
    </div>
    </>
  );
};

export default AnalyticsPage;
