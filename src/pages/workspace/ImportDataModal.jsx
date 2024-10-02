import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import DataCards from "../../components/cards/dataCards";
import DataSelectModal_API from "../../utilities/api/dataSelectModalApis";

const ImportDataModal = ({ open, onClose }) => {
  const [selectedData, setSelectedData] = useState([]); // State to track selected data from DataSelectModal
  const accessToken = useSelector((state) => state.login.token);

  // Data selection modal handling (DataSelectModal logic)
  const [openData, setOpenData] = useState([]);
  const [openLoading, setOpenLoading] = useState(true);
  const [openError, setOpenError] = useState(null);

  const [orgData, setOrgData] = useState([]);
  const [orgLoading, setOrgLoading] = useState(true);
  const [orgError, setOrgError] = useState(null);

  const [priData, setPriData] = useState([]);
  const [priLoading, setPriLoading] = useState(true);
  const [priError, setPriError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [dataType, setDataType] = useState("open");

  useEffect(() => {
    const fetchOpenData = async () => {
      setOpenLoading(true);
      setOpenError(null);
      try {
        const data = await DataSelectModal_API.getOpenData(accessToken);
        setOpenData(data);
      } catch (error) {
        setOpenError(error);
      } finally {
        setOpenLoading(false);
      }
    };

    const fetchOrgData = async () => {
      setOrgLoading(true);
      setOrgError(null);
      try {
        const data = await DataSelectModal_API.getOrgData(accessToken);
        setOrgData(data);
      } catch (error) {
        setOrgError(error);
      } finally {
        setOrgLoading(false);
      }
    };

    const fetchPriData = async () => {
      setPriLoading(true);
      setPriError(null);
      try {
        const data = await DataSelectModal_API.getPrivateData(accessToken);
        setPriData(data);
      } catch (error) {
        setPriError(error);
      } finally {
        setPriLoading(false);
      }
    };

    fetchOpenData();
    fetchOrgData();
    fetchPriData();
  }, [accessToken]);

  // Handle selecting/unselecting cards
  const handleCardClick = (id, datasourceName) => {
    if (selectedData.some((card) => card.id === id)) {
      setSelectedData(selectedData.filter((card) => card.id !== id));
    } else {
      setSelectedData([...selectedData, { id, datasourceName }]);
    }
  };

  // Filter data based on search term
  const filterData = (data) => {
    return data.filter((item) =>
      item.datasource_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Select Data</Typography>
      </DialogTitle>

      <DialogContent>
        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search data source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* Data Type Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            onClick={() => setDataType("open")}
            style={{
              fontWeight: dataType === "open" ? "bold" : "normal",
            }}
          >
            Open Data
          </Button>
          <Button
            onClick={() => setDataType("org")}
            style={{
              fontWeight: dataType === "org" ? "bold" : "normal",
            }}
          >
            Organization Data
          </Button>
          <Button
            onClick={() => setDataType("pri")}
            style={{
              fontWeight: dataType === "pri" ? "bold" : "normal",
            }}
          >
            Private Data
          </Button>
        </Box>

        {/* Data Loading/Error Display */}
        <Box>
          {dataType === "open" && openLoading && <CircularProgress />}
          {dataType === "org" && orgLoading && <CircularProgress />}
          {dataType === "pri" && priLoading && <CircularProgress />}

          {dataType === "open" && openError && (
            <Typography color="error">Failed to load open data</Typography>
          )}
          {dataType === "org" && orgError && (
            <Typography color="error">
              Failed to load organizational data
            </Typography>
          )}
          {dataType === "pri" && priError && (
            <Typography color="error">Failed to load private data</Typography>
          )}

          {/* Display Data Cards */}
          {dataType === "open" && !openLoading && (
            <Grid container spacing={2}>
              {filterData(openData).map((item) => (
                <Grid
                  item
                  key={item.id}
                  xs={6}
                  md={3}
                  onClick={() =>
                    handleCardClick(item.id, item.datasource_name)
                  }
                  sx={{
                    cursor: "pointer",
                    border: selectedData.some((card) => card.id === item.id)
                      ? "2px solid #4db6ac"
                      : "2px solid transparent",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <DataCards data={item} disable={true} />
                </Grid>
              ))}
            </Grid>
          )}

          {dataType === "org" && !orgLoading && (
            <Grid container spacing={2}>
              {filterData(orgData).map((item) => (
                <Grid
                  item
                  key={item.id}
                  xs={6}
                  md={3}
                  onClick={() =>
                    handleCardClick(item.id, item.datasource_name)
                  }
                  sx={{
                    cursor: "pointer",
                    border: selectedData.some((card) => card.id === item.id)
                      ? "2px solid #4db6ac"
                      : "2px solid transparent",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <DataCards data={item} disable={true} />
                </Grid>
              ))}
            </Grid>
          )}

          {dataType === "pri" && !priLoading && (
            <Grid container spacing={2}>
              {filterData(priData).map((item) => (
                <Grid
                  item
                  key={item.id}
                  xs={6}
                  md={3}
                  onClick={() =>
                    handleCardClick(item.id, item.datasource_name)
                  }
                  sx={{
                    cursor: "pointer",
                    border: selectedData.some((card) => card.id === item.id)
                      ? "2px solid #4db6ac"
                      : "2px solid transparent",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <DataCards data={item} disable={true} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDataModal;
