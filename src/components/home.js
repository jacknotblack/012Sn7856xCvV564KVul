import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    Home <br />
    <ul>
      <li>
        <Link to="/ranks">Ranks</Link>
      </li>
      <li>
        <Link to="/billing">Billing</Link>
      </li>
      <li>{console.log(process.env)}</li>  
    </ul>
  </div>
);

export default Home;
