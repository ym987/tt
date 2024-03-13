import Typography from "@mui/material/Typography";
import ProgressBar from "@ramonak/react-progress-bar";


const ColorChangingComponent = ({ info }) => {
  const progress = Math.floor((info.Cumule / info.Goal) * 100);

  const goal = info.Goal && Number(info.Goal).toLocaleString();
  const cumule = info.Cumule && Number(info.Cumule).toLocaleString();

  return (
    <div style={{width:'20wh', height:'15vh'}}>
       
   
      <Typography margin={'auto'}  maxWidth={"20wh"} maxHeight={"8vh"} variant="h6">{info.Name.slice(0, 30)}</Typography>
      {/* <Typography variant="p">מספר מתרים: {info.Id}</Typography> */}
      {/* <br /> */}
      <Typography variant="p">
         נתרם:{cumule} מתוך יעד:{goal}
      </Typography>
      <ProgressBar  completed={progress} bgColor="green"  margin="1px" isLabelVisible={true}/>
    </div>
  );
};

export default ColorChangingComponent;
