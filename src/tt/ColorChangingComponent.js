import Typography from "@mui/material/Typography";
import ProgressBar from "@ramonak/react-progress-bar";


const ColorChangingComponent = ({ info }) => {
  const progress = Math.floor((info.Cumule / info.Goal) * 100);



  return (
    <div>
       
   
      <Typography margin={'auto'} maxWidth={"300px"} variant="h6">{info.Name}</Typography>
      <Typography variant="p">מספר מתרים: {info.Id}</Typography>
      <br />
      <Typography variant="p">
        עד כה נתרם:{info.Cumule} מתוך יעד:{info.Goal}{" "}
        {Math.floor(progress)}%
      </Typography>
      <ProgressBar completed={progress} bgColor="green"  margin="1px" isLabelVisible={true}/>
    </div>
  );
};

export default ColorChangingComponent;
