export const authenticate = (data, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    console.log("jwt", data.token);
    
  }
  cb();
};
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }  
  if (localStorage.getItem("jwt")) {

    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

export const clearJWT = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }

  cb();
};
