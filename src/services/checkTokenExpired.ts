const checkTokenExpired = () => {
  const expTime = Number(localStorage.getItem('expToken'));
  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime < expTime;
};

export default checkTokenExpired;
