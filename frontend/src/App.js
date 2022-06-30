import { makeStyles, Button, Modal, Fade } from "@material-ui/core";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PDF from "./Views/pdf/index";
import "./App.css";
import CustomersTable from "./Views/table/index";
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  pdf: { position: "absolute", left: "-10000px", top: 0 },
});
function App() {
  const [showPdfBtn, setshowPdfBtn] = useState(false);
  const [err, setErr] = useState(false);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        format: [800, 600],
      });
      pdf.addImage(imgData, "JPEG", 200, 20, 400, 400);
      pdf.save("download.pdf");
      setshowPdfBtn(false);
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Modal
        open={err}
        onClose={() => setErr(false)}
        className={classes.modal}
      >
          <div style={{background:"white",width:"400px",height:"200px",borderRadius:"10px"}}>
            <h2 > Error !!</h2>
            <p>
              something went wrong while fetching data please try to refresh the tab
            </p>
          </div>
      </Modal>
      <CustomersTable setErr={setErr} />
      {showPdfBtn ? (
        <>
          <div id="divToPrint" className={classes.pdf}>
            <PDF setErr={setErr} />
          </div>
          <Button
            onClick={() => printDocument()}
            color="primary"
            variant="contained"
          >
            Download PDF
          </Button>
        </>
      ) : (
        <Button
          onClick={() => setshowPdfBtn(true)}
          color="secondary"
          variant="contained"
        >
          Generate PDF
        </Button>
      )}
    </div>
  );
}

export default App;
