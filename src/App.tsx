
import React from 'react';
import { PlannerProvider } from './context/PlannerContext';
import { Layout } from './components/Layout';
import { SubjectInputForm } from './components/SubjectInputForm';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <PlannerProvider>
      <Layout>
        <SubjectInputForm />
        <Dashboard />
      </Layout>
    </PlannerProvider>
  );
}

export default App;
