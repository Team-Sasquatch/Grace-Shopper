import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchUser, changeAddress } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
      setSubmitted(true);
    } catch (error) {
      console.log("Error updating address", error);
    }
  }

  return (
    <div>
      <div>
        <h2>Default Address</h2>
        <form onSubmit={handleSubmit}>
          <p>
            Address:{" "}
            <input
              type="text"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </p>
          <p>
            Address 2:{" "}
            <input
              type="text"
              defaultValue={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </p>
          <p>
            City:{" "}
            <input
              type="text"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </p>
          <p>
            State:{" "}
            <input
              type="text"
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
            />
          </p>
          <p>
            Zip Code:{" "}
            <input
              type="text"
              defaultValue={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </p>
          <button>Update Default Address</button>
        </form>
        {user.is_admin === true ? (
          <div>
            <button onClick={() => nav("/admin-users")}>Admin Portal</button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
