import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        <Table />
      </div>
    </>
  );
}

export default App;
