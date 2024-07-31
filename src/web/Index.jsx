import React from 'react';
import Navbarmenu from './pages/Navbarmenu';
import "./css/Index.css"
import Mybody from './pages/Mybody';
import { useParams } from 'react-router-dom';

function Index() {
  const { user_id } = useParams();

  return (
    <div className="indexweb">
      <Navbarmenu user_id={user_id} />
      <Mybody user_id={user_id} />
    </div>
  );
}

export default Index;
