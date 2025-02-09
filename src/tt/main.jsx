import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ProgressDisplay from "./progressDisplay";
import MainProgress from "./mainProgress";


const MyComponent = ({ ttID, mtchingId, setttID, setMatchingId }) => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Detect mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX < 50 && event.clientY < 50) {
        setShowLogout(true);
      } else {
        setShowLogout(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("ttID");
    localStorage.removeItem("matchingId");
    setttID("");
    setMatchingId("");
    setOpen(false);
  };

  return (
    <>
        <div style={{ position: "fixed", height: "100%", width: "25%",marginLeft: "75%" }}>
          {ttID && <MainProgress ttID={ttID} mtchingId={mtchingId} />}
        </div>
        <div style={{ position: "fixed", height: "100%", width: "75%" }}>
          {ttID && <ProgressDisplay ttID={ttID} />}
        </div>

      {/* Show button only when mouse is in the top-left corner */}
      {showLogout && (
        <Button
          variant="contained"
          color="secondary"
          style={{ position: "fixed", top: 10, left: 10 }}
          onClick={() => setOpen(true)}
        >
          התנתקות
        </Button>
      )}

      {/* Sign Out Confirmation Popup */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>האם אתה בטוח שברצונך להתנתק?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            ביטול
          </Button>
          <Button onClick={handleSignOut} color="secondary">
            התנתקות
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyComponent;
