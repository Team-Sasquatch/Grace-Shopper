import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { changeAddress, fetchMe } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    console.log("user from useAuth", user);
    if (user.address !== null && user.address !== "") setAddress(user.address);
    if (user.address2 !== null && user.address2 !== "")
      setAddress2(user.address2);
    if (user.city !== null && user.city !== "") setCity(user.city);
    if (user.state !== null && user.state !== "") setState(user.state);
    if (user.zipcode !== null && user.zipcode !== "") setZipCode(user.zipcode);
    if (submitted) setSubmitted(false);
    console.log(
      "address",
      address,
      "address2",
      address2,
      "city",
      city,
      "state",
      state,
      "zipcode",
      zipcode
    );
  }, [submitted]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(user.id, address, address2, city, state, zipcode);
      const result = await changeAddress(
        user.id,
        address,
        address2,
        city,
        state,
        zipcode
      );
      console.log("result", result.user);
      setUser(await fetchMe());
      setSubmitted(true);
      setEditing(false); // Close the update form after submitting
    } catch (error) {
      console.log("Error updating address", error);
    }
  }

  const handleUpdateAddress = () => {
    setEditing(true);
  };

  return (
    <div>
      {user.address && !editing ? (
        <div>
          <h3>Your Address</h3>
          <p>Address: {address}</p>
          <p>Address 2: {address2}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Zip Code: {zipcode}</p>
          <button className="registerButton" onClick={handleUpdateAddress}>
            Update Address
          </button>
          <button
            className="registerButton"
            onClick={() => nav("/profile/orders")}
          >
            Order History
          </button>
        </div>
      ) : (
        <div>
          <h3>{editing ? "Update Address" : "No Address Found"}</h3>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <p>
                Address:{" "}
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </p>
              <p>
                Address 2:{" "}
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </p>
              <p>
                City:{" "}
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </p>
              <p>
                State:{" "}
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </p>
              <p>
                Zip Code:{" "}
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </p>
              <button className="registerButton">Update Your Address</button>
            </form>
          ) : (
            <p>Please add your address</p>
          )}
        </div>
      )}
      {user.is_admin === true ? (
        <div>
          <button onClick={() => nav("/admin-users")}>Admin Portal</button>
        </div>
      ) : null}
    </div>
  );
}
