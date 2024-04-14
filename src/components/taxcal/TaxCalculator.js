import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export const TaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [extraIncome, setExtraIncome] = useState("");
  const [age, setAge] = useState("");
  const [deductionsAmt, setDeductionsAmt] = useState("");
  const focusRef = useRef();

  const ageMap = {
    "Under 40": 40,
    "40 to 60": 50,
    "Over 60": 70,
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const userAge = ageMap[age];

    // Validate input fields

    if (!income || !extraIncome || !userAge || !deductionsAmt) {
      Swal.fire({
        title: "All fields are required",
        icon: "question",
      });
      return;
    }
    if (
      isNaN(income) ||
      isNaN(extraIncome) ||
      isNaN(userAge) ||
      isNaN(deductionsAmt)
    ) {
      Swal.fire({
        title: "Fill all the field using numbers",
        icon: "question",
      });
      return;
    }
    // Calculate total income after deductions
    const totalIncome =
      Number(income) + Number(extraIncome) - Number(deductionsAmt);

    // Calculate tax based on age and income
    let taxAmount = 0;
    if (totalIncome > 800000) {
      switch (true) {
        case userAge < 40:
          taxAmount = 0.3 * (totalIncome - 800000);
          break;
        case userAge >= 40 && userAge < 60:
          taxAmount = 0.4 * (totalIncome - 800000);
          break;
        case userAge >= 60:
          taxAmount = 0.1 * (totalIncome - 800000);
          break;
        default:
          break;
      }
    }

    // Display tax amount or no tax message
    if (taxAmount > 0) {
      Swal.fire({
        title: `Tax Amount: ${taxAmount.toFixed(2)} Lakhs`,
        icon: "info",
      });
    } else {
      Swal.fire({
        title: "No tax applicable.",
        icon: "info",
      });
    }
    setIncome("");
    setAge("");
    setExtraIncome("");
    setDeductionsAmt("");
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 d-flex flex-column align-items-center justify-content-center width-100 vh-100 overflow-scroll">
      <div className="d-flex flex-column border border-2 rounded-3 p-4">
        <form className="form">
          <div className="d-flex flex-column">
            <span className="form-label fw-bold">
              Enter gross annual income
              <span className="border border-2 rounded-circle px-1 ms-1">
                <i className="bi bi-question"></i>
              </span>
            </span>
            <span>
              <input
                type="text"
                placeholder="Enter gross annual income"
                className="form-control"
                style={{ width: "343px", height: "35px" }}
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                ref={focusRef}
              />
            </span>
          </div>
          <div className="d-flex flex-column mt-3">
            <span className="form-label fw-bold">
              Enter extra income
              <span className="border border-2 rounded-circle px-1 ms-1">
                <i className="bi bi-question"></i>
              </span>
            </span>
            <span>
              <input
                type="text"
                placeholder="Enter extra income from other sources"
                className="form-control"
                style={{ width: "343px", height: "35px" }}
                value={extraIncome}
                onChange={(e) => setExtraIncome(e.target.value)}
              />
            </span>
          </div>
          <div className="d-flex flex-column mt-3">
            <span className="form-label fw-bold">
              Enter age group
              <span className="border border-2 rounded-circle px-1 ms-1">
                <i className="bi bi-question"></i>
              </span>
            </span>
            <input
              list="ageNumber"
              value={age}
              style={{ width: "343px", height: "35px" }}
              onChange={(e) => setAge(e.target.value)}
            />
            <datalist id="ageNumber">
              <option value="Under 40">Under 40</option>
              <option value="40 to 60">40 to 60</option>
              <option value="Over 60">Over 60</option>
            </datalist>
          </div>
          <div className="d-flex flex-column mt-3">
            <span className="form-label fw-bold">
              Enter total applicable deductions
              <span className="border border-2 rounded-circle px-1 ms-1">
                <i className="bi bi-question"></i>
              </span>
            </span>
            <span>
              <input
                type="text"
                placeholder="Add total applicable deductions"
                style={{ width: "343px", height: "35px" }}
                value={deductionsAmt}
                onChange={(e) => setDeductionsAmt(e.target.value)}
              />
            </span>
          </div>
          <div className="d-flex flex-column mt-5">
            <button
              className="btn fw-bold"
              style={{ background: "rgb(111, 111, 215)", color: "white" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxCalculator;
