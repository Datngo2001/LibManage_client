import React, { useState } from "react";

function LoginForm({ handleSubmit, isLoading }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputs);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="usernameInput" className="form-label">
          Username
        </label>
        <input
          name="username"
          type="text"
          className="form-control"
          id="usernameInput"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="passwordInput"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </div>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      )}
    </form>
  );
}

export default LoginForm;
