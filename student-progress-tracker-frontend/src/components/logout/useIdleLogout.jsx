// Auto logout user after inactivity (5 minutes)
// Improves security

import { useEffect, useRef, useCallback, useState } from "react";
 
 const IDLE_TIME = 5 * 60 * 1000;  

 export const useIdleLogout = () => {
   const timer = useRef(null);
 const [expired, setExpired] = useState(false);

 const logout = useCallback(()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setExpired(true);
 },[]); 


// Reset inactivity timer on user activity (mousemove, click, scroll, etc.)
 const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      logout();
    }, IDLE_TIME);
  },[logout]);

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timer.current);
    };
  }, [resetTimer]);
  return { expired, setExpired};
};