import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import BlankCard from "../../../../components/shared/BlankCard";
import EnhancedCard from "../../../brands/compare-your-bill/EnhancedCard";
import ParentCard from "../../../../components/shared/ParentCard";
import CustomFormLabel from "../../../../components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../../../components/forms/theme-elements/CustomTextField";
import { Editor } from "./customReactQuillEditor";
import TermsAndConditionsModal from './TermsAndConditionsModal';

const states = ["VIC", "NSW", "SA", "QLD"];
const fuels = ["Gas", "Electricity", "Dual Fuel"];
const logicOptions = ["If Residential", "If Small Business", "If Solar"];
const placeholders = ["Brand", "First Name", "Last Name"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

const closeButtonStyle = {
  position: "absolute",
  top: 8,
  right: 8,
};

const EnergyTermsDetail = () => {
  const { scriptId } = useParams();
  const [buttonLabel, setButtonLabel] = useState("Tango Terms");
  const [selectedStates, setSelectedStates] = useState(["VIC"]);
  const [selectedFuels, setSelectedFuels] = useState(["Gas"]);
  const [selectedLogic, setSelectedLogic] = useState("");
  const [selectedPlaceholder, setSelectedPlaceholder] = useState("");
  const [content, setContent] = useState(""); // State to hold the editor content
  const [versions, setVersions] = useState([
    {
      version: "v3_TAN_V_G_2024-05-05_11-04-20",
      validFrom: "5th May 2024, 12:04 PM",
      validTo: "Current",
      updatedBy: "Sam Jones",
      content: "This is the existing content of the current script.", // Sample content for current version
    },
    {
      version: "v2_TAN_V_G_2024-05-05_11-04-20",
      validFrom: "1st Feb 2024, 12:04 PM",
      validTo: "1st March 2024, 12:04 PM",
      updatedBy: "Sam Jones",
      content: "This is the content of the previous script version.", // Sample content for previous versions
    },
    {
      version: "v1_TAN_V_G_2024-05-05_11-04-20",
      validFrom: "1st Jan 2024, 12:04 PM",
      validTo: "1st Feb 2024, 12:04 PM",
      updatedBy: "Sam Jones",
      content: "This is the content of the first script version.", // Sample content for first version
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState(null);

  const handleVersionClick = (version) => {
    if (version.validTo === "Current") {
      setEditingVersion(version);
      setButtonLabel(version.version);
      setSelectedStates(["VIC"]);
      setSelectedFuels(["Gas"]);
      setSelectedLogic("");
      setSelectedPlaceholder("");
      setContent(version.content); // Set content for the editor
      setIsModalOpen(true);
    } else {
      setIsTermsModalOpen(true);
    }
  };

  const handleSave = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const formattedDate = `${day}${daySuffix(day)} ${currentDate.toLocaleString(
      "en-US",
      { month: "long" }
    )} ${currentDate.getFullYear()}`;
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedCurrentDate = `${formattedDate}, ${formattedTime}`;
    const versionDate = currentDate
      .toISOString()
      .replace(/[-T:]/g, "-")
      .split(".")[0];
    const updatedVersions = versions.map((version, index) => {
      if (index === 0) {
        return { ...version, validTo: formattedCurrentDate, content }; // Update the current version with new content
      }
      return version;
    });
    const newVersionId = `v${
      updatedVersions.length + 1
    }_TAN_V_${selectedStates.join("_")}_${versionDate}`;
    const newVersion = {
      version: newVersionId,
      validFrom: formattedCurrentDate,
      validTo: "Current",
      updatedBy: "Current User",
      content, // Save the current content
    };
    setVersions([newVersion, ...updatedVersions]);
    setIsModalOpen(false);
    setEditingVersion(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVersion(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <ParentCard title={`Edit ${scriptId}`}>
        <Box sx={{ mt: 3 }}>
          <EnhancedCard title="Versions">
            <BlankCard>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Version</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Valid From</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Valid To</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Updated by</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {versions.map((version, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleVersionClick(version)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          version.validTo === "Current"
                            ? "#f0f0f0"
                            : "transparent",
                      }}
                    >
                      <TableCell>{version.version}</TableCell>
                      <TableCell>{version.validFrom}</TableCell>
                      <TableCell>{version.validTo}</TableCell>
                      <TableCell>{version.updatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </BlankCard>
          </EnhancedCard>
        </Box>
      </ParentCard>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <Box sx={{ ...modalStyle, maxHeight: "150vh", overflow: "hidden" }}>
            <IconButton sx={closeButtonStyle} onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" mb={2}>
              Edit {buttonLabel}
            </Typography>
            <Box sx={{ mb: 2, pr: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} display="flex" alignItems="center">
                  <CustomFormLabel
                    htmlFor="bl-name"
                    sx={{ mt: 0, mb: { xs: "-5px", sm: 0 } }}
                  >
                    Button Label
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <CustomTextField
                    placeholder="CompareYour"
                    value={buttonLabel}
                    onChange={(e) => setButtonLabel(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} display="flex" alignItems="center">
                  <CustomFormLabel
                    htmlFor="bl-name"
                    sx={{ mt: 0, mb: { xs: "-5px", sm: 0 } }}
                  >
                    States
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Autocomplete
                    multiple
                    options={states}
                    value={selectedStates}
                    onChange={(event, newValue) => setSelectedStates(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} display="flex" alignItems="center">
                  <CustomFormLabel
                    htmlFor="bl-name"
                    sx={{ mt: 0, mb: { xs: "-5px", sm: 0 } }}
                  >
                    Fuels
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Autocomplete
                    multiple
                    options={fuels}
                    value={selectedFuels}
                    onChange={(event, newValue) => setSelectedFuels(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    fullWidth
                    sx={{ mb: "18px" }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ position: "absolute", right: "90px", zIndex: 5 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Autocomplete
                    options={logicOptions}
                    value={selectedLogic}
                    onChange={(event, newValue) => {
                      setSelectedLogic(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Insert Logic"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            height: "30px",
                            padding: "0 8px",
                            fontSize: "12px",
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            fontSize: "12px",
                            lineHeight: "1.2",
                          },
                        }}
                      />
                    )}
                    sx={{
                      width: "150px",
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                    }}
                  />
                  <Autocomplete
                    options={placeholders}
                    value={selectedPlaceholder}
                    onChange={(event, newValue) => {
                      setSelectedPlaceholder(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Insert Placeholder"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            height: "60px",
                            padding: "0 8px",
                            fontSize: "12px",
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            fontSize: "12px",
                            lineHeight: "1.2",
                          },
                        }}
                      />
                    )}
                    sx={{
                      width: "150px",
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Editor
                placeholder={"Enter your text here..."}
                selectedLogic={selectedLogic}
                selectedPlaceholder={selectedPlaceholder}
                onLogicInserted={() => setSelectedLogic("")}
                onPlaceholderInserted={() => setSelectedPlaceholder("")}
                content={content} // Pass the content here
                onChange={(updatedContent) => setContent(updatedContent)} // Keep the content state in sync
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "30px" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
      <TermsAndConditionsModal
        open={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </Box>
  );
};

export default EnergyTermsDetail;