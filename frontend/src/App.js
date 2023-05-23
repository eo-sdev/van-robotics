import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { 
  Welcome,
  ClassBatch,
  Learner,
} from './containers';
import Learners from './containers/Learners';
import ClassBatches from './containers/ClassBatches';

const App = ({ api }) => {
  return (
    <section className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/learners" element={<Learners />} />
          <Route path="/learner/:learnerId" element={<Learner />} />
          <Route path="/classbatches" element={<ClassBatches />} />
          <Route path="/classbatch/:classbatchId" element={<ClassBatch />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
