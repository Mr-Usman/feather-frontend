import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import Table from "./components/Table";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [policies, setPolicies] = useState([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [filteredPolicies, setFilteredPolicies] = useState([]);

  useEffect(() => {
    fetch("https://feather-backend.herokuapp.com/policies")
      .then((res) => res.json())
      .then((data) => {
        setPolicies(data.data);
        setFilteredPolicies(data.data);
      });
  }, []);

  const handleDebounceFn = (inputValue: any) => {
    if (!inputValue) return setFilteredPolicies(policies);
    else if (inputValue) {
      const newFilteredPolicies = policies.filter((policy) => {
        const { customer } = policy;
        const { firstName, lastName } = customer;
        const fullName = `${firstName} ${lastName}`;
        return fullName.toLowerCase().includes(inputValue.toLowerCase());
      });
      console.log("new Value:", newFilteredPolicies);
      // setFilteredPolicies(
      //   newFilteredPolicies.length === 0 ? policies : newFilteredPolicies
      // );
      setFilteredPolicies(newFilteredPolicies);
    }
  };

  const debounceFn = debounce(handleDebounceFn, 500);

  useEffect(() => {
    debounceFn(customerName);
  }, [customerName]);

  function handleChange(val: any) {
    setCustomerName(val);
  }

  console.log("filtered policies:", filteredPolicies);
  console.log("policies policies:", policies);

  return (
    <>
      <Navbar />
      <div className="w-full p-8">
        {/* <Header /> */}
        <Filters customerName={customerName} setCustomerName={handleChange} />
        {/* <Table /> */}
        <Pagination data={filteredPolicies} />
      </div>
    </>
  );
}

export default App;
