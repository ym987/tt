import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ProgressDisplay from "./progressDisplay";
import MainProgress from "./mainProgress";

const MyComponent = ({ ttID, mtchingId, setttID, setMatchingId }) => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFullScreenPrompt, setShowFullScreenPrompt] = useState(false);

  // Detect mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX < 50 && event.clientY < 100) {
        setShowLogout(true);
      } else {
        setShowLogout(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if window is in full view mode
  useEffect(() => {
    const checkFullScreen = () => {
      
      if (
        window.innerWidth < window.screen.width ||
        window.innerHeight < window.screen.height
      ) {
        setShowFullScreenPrompt(true);
      } else {
        setShowFullScreenPrompt(false);
      }
    };

    window.addEventListener("resize", checkFullScreen);
    checkFullScreen();

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("ttID");
    localStorage.removeItem("matchingId");
    localStorage.removeItem("uploadedImage");
    localStorage.removeItem("MatchingType");
    setttID("");
    setMatchingId("");
    setOpen(false);
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  

  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "30%",
          marginLeft: "70%",
        }}
      >
        {ttID && <MainProgress ttID={ttID} mtchingId={mtchingId} />}
      </div>
      <div style={{ position: "fixed", height: "100%", width: "70%" }}>
        {ttID && <ProgressDisplay ttID={ttID} />}
      </div>

      {/* Show button only when mouse is in the top-left corner */}
      {(showLogout || showFullScreenPrompt) && (
        <>
          <Button
            variant="contained"
            color="secondary"
            style={{ position: "fixed", top: 10, left: 10 }}
            onClick={() => setOpen(true)}
          >
            התנתקות
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ position: "fixed", top: 50, left: 10 }}
            onClick={() => handleFullScreen()}
          >
            מסך מלא
          </Button>
        </>
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

      {/* Full Screen Prompt Popup */}
      <Dialog
        open={showFullScreenPrompt}
        onClose={() => setShowFullScreenPrompt(false)}
      >
        <DialogTitle dir="rtl">הודעה</DialogTitle>
        <DialogContent>
          <DialogContentText dir="ltr">
            <span dir="rtl">  לחץ על F11 כדי לעבור למסך מלא</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowFullScreenPrompt(false)}
            color="primary"
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyComponent;
