import { atom } from 'recoil';

// Define an atom to manage authentication state
export const userRole = atom({
  key: 'role', // unique ID (with respect to other atoms/selectors)
  default: "customer", // default value (aka initial value)
});