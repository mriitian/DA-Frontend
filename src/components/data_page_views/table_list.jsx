import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccessControlModal from "../modals/accessControlModal";
import tableDataAPI from "../../utilities/api/tableDataAPI";

const TableList = ({ type, datasource_name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // State to store total count

  const currentURL = useLocation().pathname;

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const values = {
        page: page,
        page_size: pageSize,
        datasource_name: datasource_name,
      };
      const response = await tableDataAPI.getOpenData(values);
      console.log("API Response:", response); // Debugging: Check the response

      // Check if response.data exists
      if (response && response.data) {
        let cleanedDataString = response.data;

        // Replace NaN with null to make the JSON string valid
        cleanedDataString = cleanedDataString.replace(/NaN/g, "null");

        let parsedData;
        try {
          parsedData = JSON.parse(cleanedDataString); // Parse the cleaned JSON string
          if (Array.isArray(parsedData.data)) {
            setData(parsedData.data); // Set the cleaned and parsed data
            // Use page_size from the parsed data to set total count
            const count = parsedData.page_size || 0;
            setTotalCount(count);
            console.log("Total Count:", count); // Debugging: Check the total count value
          } else {
            setData([]); // Default to an empty array if parsed data is not as expected
            setTotalCount(0); // Reset total count if data is empty
          }
        } catch (parseError) {
          console.error("Error parsing cleaned API response data:", parseError);
          setData([]); // Handle parsing errors by setting an empty array
          setTotalCount(0); // Reset total count on error
        }
      } else {
        setData([]); // Default to an empty array if response data is not as expected
        setTotalCount(0); // Reset total count if no response data
      }
    } catch (error) {
      setError(error);
      setData([]); // Set to an empty array on error to avoid undefined issues
      setTotalCount(0); // Reset total count on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize, datasource_name]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to the first page whenever page size changes
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <>
      <AccessControlModal />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{
          margin: "1% 2% 1% 2%",
        }}
      >
        <Link
          sx={{ fontWeight: 500 }}
          underline="hover"
          color="inherit"
          href={currentURL}
        >
          Organizational Data
        </Link>

        <Typography sx={{ fontWeight: 600 }} color="grey">
          {datasource_name}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ marginTop: "3%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="page-size-select-label">Page Size</InputLabel>
            <Select
              labelId="page-size-select-label"
              id="page-size-select"
              value={pageSize}
              label="Page Size"
              onChange={handlePageSizeChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <Pagination
            count={Math.max(Math.ceil(totalCount / pageSize), 1)} // Ensure at least 1 page is shown
            page={page}
            onChange={handlePageChange}
            disabled={totalCount === 0} // Disable pagination if no data
          />
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Array.isArray(data) &&
                  data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <TableCell
                      key={key}
                      style={{
                        fontWeight: "600",
                        textAlign: "left",
                        color: "#707070",
                        lineHeight: "16px",
                        fontSize: "12px",
                        backgroundColor: "#ebebeb",
                        border: "1px solid #5b5b5b",
                        padding: "10px 12px",
                      }}
                    >
                      {key}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                >
                  {Object.values(item).map((value, i) => (
                    <TableCell
                      key={i}
                      style={{
                        textAlign: "left",
                        color: "#707070",
                        lineHeight: "16px",
                        fontSize: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        border: "1px solid #5b5b5b",
                        padding: "10px 12px",
                      }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.max(Math.ceil(totalCount / pageSize), 1)} // Ensure at least 1 page is shown
            page={page}
            onChange={handlePageChange}
            disabled={totalCount === 0} // Disable pagination if no data
          />
        </Box>
      </Box>
    </>
  );
};

export default TableList;
