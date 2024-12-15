import { useState, useEffect } from "react";

function ErrorAlert() {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <>
      <p className="text-danger text-center">Failed to load news. Please try again later in {countdown}...</p>
      <p className="text-danger text-center">Poor API`s limit rate XD</p>
    </>
  );
}

export default ErrorAlert;
