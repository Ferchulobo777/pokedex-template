import React, { useContext, useState } from 'react';

import { Navigate, useNavigate } from 'react-router';

import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const [nameValue, setNameValue] = useState('');

  const [nameError, setNameError] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);

    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z ]{2,}$/.test(newNameValue))
      setNameError('Only letters and blanks are allowed and least should be 3 length');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) {
      setUser(nameValue);
    }
  };

  return (
    <div>
      <div>
        <img src="/public/Logo_Pokedex.png" alt="Pokedex" />
      </div>

      <div className="text-center">
        <h1 className="text-red-500 text-4xl font-bold">¡Hello Trainer!</h1>

        <p>Type your name to start</p>
      </div>

      <form
        className="flex flex-row justify-center items-center mt-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="shadow-md border border-black p-3"
          value={nameValue}
          onChange={handleChange}
        />

        <button type="submit" className="bg-red-500 text-white font-bold p-3">
          Start
        </button>
      </form>

      {nameError && <p className="text-red-500 text-center">{nameError}</p>}

      {user && <Navigate to="/pokedex" />}
    </div>
  );
};

export default Home;
