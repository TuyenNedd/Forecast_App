import React from "react";

function SignOut({onSignOut}) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <a onClick={onSignOut}>Logout</a> {/* Gọi hàm onSignOut */}
    </div>
  );
}
export default SignOut;
