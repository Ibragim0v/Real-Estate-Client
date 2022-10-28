import React, { useState, useEffect } from "react";
import "./Room.scss";
import { Sidebar } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Room = () => {
  const [inform, setInform] = useState("");
  const [complexes, setComplexes] = useState([]);
  const [data, setData] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/complexes`)
      .then((res) => res.json())
      .then((data) => setComplexes(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/roomComplexes`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  const newRoom = (e) => {
    e.preventDefault();

    const { rooms, square, complex } = e.target;

    fetch(`${process.env.REACT_APP_API}/createRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        rooms: Number(rooms.value.toString().trim()),
        square: Number(square.value.toString().trim()),
        complex: complex.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInform(data?.message);
        rooms.value = null;
        square.value = null;
        complex.value = "Select Complex";
      })
      .catch((err) => console.error(err));
  };

  const updateRoom = async (e) => {
    e.preventDefault();

    const { updating__rooms, updating__square } = e.target;

    if (updatingId) {
      if (updating__rooms.value || updating__square.value) {
        const request = await fetch(
          `${process.env.REACT_APP_API}/updateRoom/${updatingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              rooms: updating__rooms.value
                ? Number(updating__rooms.value.toString().trim())
                : undefined,
              square: updating__square.value
                ? Number(updating__square.value.toString().trim())
                : undefined,
            }),
          }
        );

        setInform((await request.json())?.message);

        updating__rooms.value = null;
        updating__square.value = null;
        return;
      }
      updating__rooms.value = null;
      updating__square.value = null;
    }
  };

  useEffect(() => {
    if (removingId) {
      fetch(`${process.env.REACT_APP_API}/deleteRoom/${removingId}`, {
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
    <section className="room">
      <Sidebar />

      <div className="room__wrapper">
        {updateForm ? (
          <form onSubmit={updateRoom}>
            <h3>Update Room</h3>
            <input
              type="number"
              name="updating__rooms"
              placeholder="Amount of Room"
              autoComplete="off"
            />
            <input
              type="number"
              name="updating__square"
              placeholder="Square of Room"
              autoComplete="off"
            />

            <button type="submit" className="room__submit">
              Send
            </button>
          </form>
        ) : (
          <form onSubmit={newRoom}>
            <h3>New Room</h3>
            <input
              type="number"
              name="rooms"
              placeholder="Amount of Room"
              autoComplete="off"
              required
            />
            <input
              type="number"
              name="square"
              placeholder="Square of Room"
              autoComplete="off"
              required
            />
            <select name="complex" required>
              <option selected disabled>
                Select Complex
              </option>

              {complexes?.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <button type="submit" className="room__submit">
              Send
            </button>
          </form>
        )}
      </div>

      <div className="room__cover">
        <table>
          <thead>
            <tr>
              <th>Complex</th>
              <th>Address</th>
              <th>Price of a square</th>
              <th>Amount of rooms</th>
              <th>Square</th>
              <th>Total Price</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(({ id, rooms, square, complex }) => (
              <tr key={id}>
                <td>{complex.name}</td>
                <td>{complex.address}</td>
                <td>{complex.price}</td>
                <td>{rooms}</td>
                <td>{square}</td>
                <td>{complex.price * square}</td>
                <td>
                  <button className="room__remove-btn">
                    <DeleteIcon onClick={() => setRemovingId(id)} />
                  </button>
                </td>
                <td>
                  <button className="room__edit-btn">
                    <EditIcon
                      onClick={() => {
                        setUpdateForm(true);
                        setUpdatingId(id);
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="room__creation" onClick={() => setUpdateForm(false)}>
        New Room
      </button>
    </section>
  );
};
