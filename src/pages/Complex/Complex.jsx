import React, { useState, useEffect } from "react";
import "./Complex.scss";
import { Sidebar } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Complex = () => {
  const [inform, setInform] = useState("");
  const [companies, setCompanies] = useState([]);
  const [data, setData] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/complexCompanies`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  const newComplex = (e) => {
    e.preventDefault();

    const { name, address, price, company } = e.target;

    fetch(`${process.env.REACT_APP_API}/createComplex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name.value.toString().trim(),
        address: address.value.toString().trim(),
        price: Number(price.value.toString().trim()),
        company: company.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInform(data?.message);
        name.value = null;
        address.value = null;
        price.value = null;
        company.value = "Select Company";
      })
      .catch((err) => console.error(err));
  };

  const updateComplex = async (e) => {
    e.preventDefault();

    const { updating_name, updating_address, updating_price } = e.target;

    if (updatingId) {
      if (updating_name || updating_address || updating_price) {
        const request = await fetch(
          `${process.env.REACT_APP_API}/updateComplex/${updatingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              name: updating_name.value
                ? updating_name.value.toString().trim()
                : undefined,
              address: updating_address.value
                ? updating_address.value.toString().trim()
                : undefined,
              price: updating_price.value
                ? Number(updating_price.value.toString().trim())
                : undefined,
            }),
          }
        );

        setInform((await request.json())?.message);

        updating_name.value = null;
        updating_address.value = null;
        updating_price.value = null;
        return;
      }
    }
  };

  useEffect(() => {
    if (removingId) {
      fetch(`${process.env.REACT_APP_API}/deleteComplex/${removingId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => setInform(data?.message))
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  }, [removingId]);

  console.log(inform);

  return (
    <section className="complex">
      <Sidebar />

      <div className="complex__wrapper">
        {updateForm ? (
          <form onSubmit={updateComplex}>
            <h3>Update Complex</h3>
            <input
              type="text"
              name="updating_name"
              placeholder="Name of Complex"
              autoComplete="off"
            />
            <input
              type="text"
              name="updating_address"
              placeholder="Address of Complex"
              autoComplete="off"
            />
            <input
              type="number"
              name="updating_price"
              placeholder="Price of a square"
              autoComplete="off"
            />

            <button type="submit" className="complex__submit">
              Send
            </button>
          </form>
        ) : (
          <form onSubmit={newComplex}>
            <h3>New Complex</h3>
            <input
              type="text"
              name="name"
              placeholder="Name of Complex"
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address of Complex"
              autoComplete="off"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price of a square"
              autoComplete="off"
              required
            />
            <select name="company" required>
              <option selected disabled>
                Select Company
              </option>

              {companies?.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <button type="submit" className="complex__submit">
              Send
            </button>
          </form>
        )}
      </div>

      <ul className="complex__list">
        {data?.map(({ id, name, address, price, company }) => (
          <li className="complex__item" key={id}>
            <img
              src={company.img_url}
              alt="logo"
              className="complex__img"
              width={250}
              height={250}
            />
            <h3 className="complex__title">Company: {company.name}</h3>
            <p>Complex: {name}</p>
            <span>
              Address: {address}
              <br /> Price: {price}
            </span>
            <div className="complex__group-button">
              <button className="complex__remove-btn">
                <DeleteIcon onClick={() => setRemovingId(id)} />
              </button>
              <button
                className="complex__edit-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <EditIcon
                  onClick={() => {
                    setUpdateForm(true);
                    setUpdatingId(id);
                  }}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="complex__creation"
        onClick={() => setUpdateForm(false)}
      >
        New Complex
      </button>
    </section>
  );
};
