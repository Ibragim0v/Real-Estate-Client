import React, { useEffect, useState } from "react";
import "./Mortage.scss";

export const Mortage = () => {
  const [selectCompanies, setSelectCompanies] = useState([]);
  const [companyComplexes, setCompanyComplexes] = useState([]);
  const [complexRooms, setComplexRooms] = useState([]);
  const [room, setRoom] = useState([]);
  const [bank, setBank] = useState([]);
  const [cost, setCost] = useState(null);
  const [startingPayment, setStartingPayment] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [duration, setDuration] = useState(null);

  const durations = [
    {
      id: 1,
      value: 10,
    },
    {
      id: 2,
      value: 15,
    },
    {
      id: 3,
      value: 20,
    },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((res) => res.json())
      .then((data) => setSelectCompanies(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  const handleCompanyId = (e) => {
    const id = e.target.value;

    fetch(`${process.env.REACT_APP_API}/company/${id}`)
      .then((res) => res.json())
      .then((data) => setCompanyComplexes(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleComplexId = (e) => {
    const id = e.target.value;

    fetch(`${process.env.REACT_APP_API}/complex/${id}`)
      .then((res) => res.json())
      .then((data) => setComplexRooms(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleRoomId = (e) => {
    const id = e.target.value;

    fetch(`${process.env.REACT_APP_API}/room/${id}`)
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleCalculator = (e) => {
    const price = complexRooms[0]?.price;
    const square = room[0]?.square;
    const duration = Number(e.target.value);

    fetch(
      `${process.env.REACT_APP_API}/calculator/${price}/${square}/${duration}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBank([data?.suitableBank]);
        setCost(data?.apartmentCost);
        setStartingPayment(data?.startingPayment);
        setMonthlyPayment(data?.monthlyPayment);
        setDuration(data?.duration);
      })
      .catch((err) => {
        throw err.message;
      });
  };

  console.log(bank, cost, startingPayment, monthlyPayment, duration);

  return (
    <section className="mortage">
      <div className="mortage__container">
        <h2>Mortage Calculator</h2>
        <div className="mortage__select-group">
          <select onChange={handleCompanyId}>
            <option selected disabled>
              Select Company
            </option>

            {selectCompanies?.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            name="complex"
            disabled={!Boolean(companyComplexes?.length)}
            onChange={handleComplexId}
          >
            <option selected disabled>
              Select Complex
            </option>

            {companyComplexes[0]?.complexes?.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            name="room"
            disabled={!Boolean(complexRooms?.length)}
            onChange={handleRoomId}
          >
            <option selected disabled>
              Select Room
            </option>
            {complexRooms[0]?.rooms?.map(({ id, rooms, square }) => (
              <option value={id} key={id}>
                {rooms} - {square}m2
              </option>
            ))}
          </select>
          <select
            name="duration"
            disabled={!Boolean(room?.length)}
            onChange={handleCalculator}
          >
            <option selected disabled>
              Choose Duration
            </option>

            {durations?.map(({ id, value }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {companyComplexes?.length > 0 && (
          <div className="mortage__calculation">
            <div className="mortage__apartment">
              {companyComplexes?.map(({ id, name, img_url }) => (
                <div className="mortage__company" key={id}>
                  <img src={img_url} alt="company" width={200} height={200} />
                  <p>Company: {name}</p>
                </div>
              ))}

              {complexRooms?.length > 0 &&
                complexRooms?.map(({ id, name, address }) => (
                  <div className="mortage__complex" key={id}>
                    <p>Complex: {name}</p>
                    <span>Address: {address}</span>
                  </div>
                ))}
              {room?.length > 0 &&
                room?.map(({ id, rooms, square }) => (
                  <div className="mortage__room" key={id}>
                    <p>Amout of Rooms: {rooms}</p>
                    <span>Square: {square}</span>
                  </div>
                ))}
            </div>
            {bank?.length > 0 &&
              bank?.map(({ id, name, img_url }) => (
                <div className="mortage__bank" key={id}>
                  <img src={img_url} alt="bank" width={200} height={200} />
                  <p>Bank: {name}</p>
                </div>
              ))}

            {bank?.length > 0 && (
              <div className="mortage__payment">
                <h3>Cost: {cost}</h3>
                <p>Starting: {startingPayment}</p>
                <span>Monthly: {monthlyPayment}</span> <br />
                <strong>Duration: {duration}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
