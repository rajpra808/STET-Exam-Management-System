import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { currentuser: initialUsers, children } = props;

  // Use State to keep the values
  const [currentuser, setUsers] = useState(initialUsers);
  //const [selectedUser, setSelectedUser] = useState(initialSelectedUsers);

  const addNewUser = (phone_no) => {
    const newUser = { Phone_No: phone_no };
    console.log("New User" + newUser);
    setUsers(currentuser.concat([newUser]));
  };

  // Make the context object:
  const usersContext = {
    currentuser,
    setUsers,
    //selectedUser,
    //setSelectedUser,
    addNewUser,
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  currentuser: PropTypes.array,
};

Provider.defaultProps = {
  users: [],
};
