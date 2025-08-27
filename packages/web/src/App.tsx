import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, formatDate } from '@monorepo/shared';

function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Web Frontend</h1>
      <p className="text-lg text-gray-600 mb-6">
        React application using shared components and utilities.
      </p>
      <Button onClick={() => alert(`Current time: ${formatDate(new Date())}`)}>
        Test Shared Utils
      </Button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
