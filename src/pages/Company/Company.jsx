import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import "./Company.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Company = () => {
  const [inform, setInform] = useState("");
  const [data, setData] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  const newCompany = (e) => {
    e.preventDefault();

    const { name, url } = e.target;

    fetch(`${process.env.REACT_APP_API}/createCompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name.value.toString().trim(),
        img_url: url.value.toString().trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInform(data?.message);
        name.value = null;
        url.value = null;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const updateCompany = async (e) => {
    e.preventDefault();

    const { updating_name, updating_url } = e.target;

    if (updatingId) {
      if (updating_name && updating_url) {
        const request = await fetch(
          `${process.env.REACT_APP_API}/updateCompany/${updatingId}`,
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
              img_url: updating_url.value
                ? updating_url.value.toString().trim()
                : undefined,
            }),
          }
        );

        setInform((await request.json())?.message);

        updating_name.value = null;
        updating_url.value = null;
        return;
      }
      updating_name.value = null;
      updating_url.value = null;
    }
  };

  useEffect(() => {
    if (removingId) {
      fetch(`${process.env.REACT_APP_API}/deleteCompany/${removingId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => setInform(data))
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  }, [removingId]);

  return (
    <section className="company">
      <Sidebar />

      <div className="company__wrapper">
        {updateForm ? (
          <form onSubmit={updateCompany}>
            <h3>Update Company</h3>
            <input
              type="text"
              name="updating_name"
              placeholder="Company Name"
              autoComplete="off"
            />
            <input
              type="text"
              name="updating_url"
              placeholder="Company Img URL"
              autoComplete="off"
            />
            <button type="submit" className="company__submit">
              Send
            </button>
          </form>
        ) : (
          <form onSubmit={newCompany}>
            <h3>New Company</h3>
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="url"
              placeholder="Company Img URL"
              autoComplete="off"
              required
            />
            <button type="submit" className="company__submit">
              Send
            </button>
          </form>
        )}
      </div>

      <ul className="company__list">
        {data?.map(({ id, name, img_url }) => (
          <li className="company__item" key={id}>
            <img
              src={img_url}
              alt="logo"
              className="company__img"
              width={250}
              height={250}
            />
            <p className="company__title">{name}</p>
            <div className="company__group-button">
              <button className="company__remove-btn">
                <DeleteIcon onClick={() => setRemovingId(id)} />
              </button>
              <button
                className="company__edit-btn"
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
        className="company__creation"
        onClick={() => setUpdateForm(false)}
      >
        New Company
      </button>
    </section>
  );
};
