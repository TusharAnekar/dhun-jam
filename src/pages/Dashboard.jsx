/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRestoBarContext } from "../contexts/resto-bar-context";
import { Chart } from "../components/Chart";

const Dashboard = () => {
  const {
    getAdminDetails,
    restoBar: { amount, location, name, charge_customers },
    setRestoBar,
    handlePriceUpdate,
  } = useRestoBarContext();

  const [updatedAmount, setUpdatedAmount] = useState({ ...amount });

  const requestAmount =
    amount &&
    Object.values(amount).filter(
      (categoryValue) => categoryValue !== amount.category_6,
    );

  const amountKeys = amount && Object.keys(amount);

  useEffect(() => {
    getAdminDetails();
  }, []);

  const handleChargeCustomer = (e) => {
    setRestoBar({
      type: "SET_CHARGE_CUSTOMERS",
      payload: e.target.id === "yes" ? true : false,
    });
  };

  const handleAmount = (e) => {
    setUpdatedAmount({
      ...updatedAmount,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePriceUpdate(updatedAmount);
  };

  return (
    <>
      {amount && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <h1 className="heading font-bold">
            {name}, {location} onn Dhun Jam
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="w-1/2">
                Do you want to charge your customers for requesting songs?
              </p>

              <div className="w-1/2 text-center">
                <input
                  type="radio"
                  name="charge-songs"
                  id="yes"
                  className="mr-2 accent-violet-500"
                  defaultChecked={charge_customers}
                  onClick={handleChargeCustomer}
                />
                <label htmlFor="yes" className="mr-4">
                  Yes
                </label>
                <input
                  type="radio"
                  name="charge-songs"
                  id="no"
                  className="mr-2  accent-violet-500"
                  defaultChecked={charge_customers ? true : false}
                  onClick={handleChargeCustomer}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className="flex justify-between">
              <label htmlFor="amount">Custom song request amount-</label>
              <input
                type="number"
                name={amountKeys[0]}
                id="amount"
                defaultValue={amount.category_6}
                min={99}
                disabled={charge_customers ? false : true}
                required={charge_customers ? true : false}
                className="w-1/2 rounded-lg border bg-black py-2 text-center"
                onChange={handleAmount}
              />
            </div>

            <div className="flex justify-between gap-4">
              <p className="w-1/2">
                Regular song request amounts, from high to low-
              </p>
              <div className="flex w-1/2 justify-between">
                {requestAmount.map((categoryValue, index) => (
                  <input
                    type="number"
                    name={amountKeys[index + 1]}
                    id=""
                    key={index}
                    defaultValue={categoryValue}
                    disabled={charge_customers ? false : true}
                    min={categoryValue}
                    required={charge_customers ? true : false}
                    className="h-fit w-12 rounded-lg border border-white bg-black"
                    onChange={handleAmount}
                  />
                ))}
              </div>
            </div>

            {charge_customers && <Chart updatedAmount={updatedAmount} />}

            <button
              disabled={charge_customers ? false : true}
              className="rounded-lg bg-violet-800 p-2 hover:border hover:border-violet-200"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export { Dashboard };
