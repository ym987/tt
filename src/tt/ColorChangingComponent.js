import ProgressBar from "@ramonak/react-progress-bar";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";

const ColorChangingComponent = ({ info }) => {
  const { Cumule = 0, Goal = 1, Name = "" } = info;
  const progress = Goal !== "0" ? Math.floor((Cumule / Goal) * 100) : 100;

  const goal = info.Goal && Number(Goal).toLocaleString();
  const cumule = Cumule && Number(Cumule).toLocaleString();

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  //   margin: theme.spacing(1), // Add margin for spacing
  //   // padding: theme.spacing(3), // Add padding for inner spacing
  // }));

  return (
    <div
      style={{
        backgroundColor: "#fff",
        // padding: "2vh",
        textAlign: "center",
        color: "#333",
        margin: "1vh",
        border: "0.1vh solid #ddd",
        borderRadius: "1vh",
        boxShadow: "0 0.2vh 0.4vh rgba(0, 0, 0, 0.1)",
        width: `16.5vw`,
        height: `10vh`,
        padding: "0.5vh",
      }}
    >
      <div style={{ position: "relative", height: "100%" }}>
        <div
          style={{
            fontFamily: "CustomFont",
            color: "black",
            fontSize: "1.8vw",
            margin: "1vh",
            align: "center",
            lineHeight: "0.8em",
            direction: "rtl",
          }}
        >
          {Name.slice(0, 30)}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "6vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "CustomFont",
            color: "black",
            fontSize: "1.4vw",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          נתרם: {cumule} מתוך: {goal}
        </div>
        <div style={{ position: "absolute", bottom: "1vh", width: "100%" }}>
          <ProgressBar
            completed={progress}
            bgColor="green"
            isLabelVisible={true}
          />
        </div>
      </div>
      {/* </Item> */}
    </div>
  );
};

export default ColorChangingComponent;
