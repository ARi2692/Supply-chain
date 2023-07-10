import React from "react";
import NavBar from "../../components/NavBar";
import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <NavBar />
      <div className="header">
        <h1>Revolutionize Supply Chain system</h1>
        <h4>Supply chain made easy to track!</h4>
      </div>

      <div className="float-container">
        <Link to="/farmer">
          <div className="float-child-left">
            <h2>Farmer</h2>
          </div>
        </Link>
        <Link to="/processor">
          <div className="float-child-left">
            <h2>Processor</h2>
          </div>
        </Link>
      </div>
      <div className="float-container">
      <Link to="/manufacturer">
          <div className="float-child-right">
            <h2>Supplier</h2>
          </div>
        </Link>
        <Link to="/distributionCompany">
          <div className="float-child-right">
            <h2>DistributionCompany</h2>
          </div>
        </Link>
      </div>
      <div className="float-container">
        <Link to="/distributionCentre">
          <div className="float-child-left">
            <h2>DistributionCentre</h2>
          </div>
        </Link>
        <Link to="/deliveryTruck">
          <div className="float-child-right">
            <h2>DeliveryTruck</h2>
          </div>
        </Link>
      </div>
      <div className="float-container">
        <Link to="/retailer">
          <div className="float-child-left">
            <h2>Retailer</h2>
          </div>
        </Link>
        <Link to="/consumer">
          <div className="float-child-right">
            <h2>Consumer</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
