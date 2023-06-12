import { PropsWithChildren, useState } from "react";
import { AuthContext, getUserFromStorage } from "../auth";

function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState(getUserFromStorage());

  function fetchUserFromStorage() {
    setUser(getUserFromStorage());
  }
  return (
    <AuthContext.Provider value={{ user, fetchUserFromStorage }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
