import { useState, useEffect } from "react";
import { debounce } from "lodash";
// import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [policies, setPolicies] = useState([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [prevFilters, setPrevFilters] = useState([]);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    fetch("https://feather-backend.herokuapp.com/policies")
      .then((res) => res.json())
      .then((data) => {
        setPolicies(data.data);
        setFilteredPolicies(data.data);
      });
  }, []);

  const handleDebounceFn = (inputValue: any) => {
    if (inputValue) {
      const newFilteredPolicies = filteredPolicies.filter((policy) => {
        const { customer } = policy;
        const { firstName, lastName } = customer;
        const fullName = `${firstName} ${lastName}`;
        return fullName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
      });
      setFilteredPolicies(newFilteredPolicies);
    }
  };

  const debounceFn = debounce(handleDebounceFn, 300);

  useEffect(() => {
    if (customerName) {
      debounceFn(customerName);
    } else if (!type && !customerName) {
      setFilteredPolicies(policies);
    } else {
      setFilteredPolicies(prevFilters);
    }
  }, [customerName]);

  function handleChange(val: any) {
    setCustomerName(val);
  }

  const handleTypeChange = (val: any) => {
    if (val === "type") {
      setFilteredPolicies(policies);
    } else {
      const filteredPoliciesByTypes = policies.filter(
        ({ insuranceType }, key) => {
          return insuranceType === val;
        }
      );
      setType(val);
      setFilteredPolicies(filteredPoliciesByTypes);
      setPrevFilters(filteredPoliciesByTypes);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full p-8">
        {/* <Header /> */}
        <Filters
          customerName={customerName}
          setCustomerName={handleChange}
          handleTypeChange={handleTypeChange}
        />
        <Pagination data={filteredPolicies} type={type} />
      </div>
    </>
  );
}

export default App;
