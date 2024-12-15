import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Collapse,
  IconButton,
  Box,
  Typography,
  CardContent,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { getDishDetails } from "../api/api";

const headCells = [
  { id: "name", label: "Name", disableSorting: false },
  { id: "diet", label: "Diet", disableSorting: false },
  { id: "prep_time", label: "Preperation Time", disableSorting: false },
  { id: "cook_time", label: "Cooking Time", disableSorting: false },
  { id: "region", label: "Region", disableSorting: false },
];

const DishTable = ({ dishes, title }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const recordsAfterPagingAndSorting = useMemo(() => {
    return stableSort(
      dishes,
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [dishes, order, orderBy, page, rowsPerPage]);

  const handleRowExpand = async (dishId) => {
    if (expandedRow === dishId) {
      setExpandedRow(null); // Collapse if already expanded
    } else {
      setExpandedRow(dishId); // Expand this row
      if (!expandedDetails[dishId]) {
        try {
          const { data } = await getDishDetails(dishId); // Fetch details if not cached
          setExpandedDetails((prev) => ({ ...prev, [dishId]: data }));
        } catch (error) {
          console.error("Failed to fetch dish details:", error);
        }
      }
    }
  };

  return (
    <div className="dish-suggester p-4">

      {/* Suggested Dishes Table */}
      {dishes.length > 0 && (
        <div className="mt-8">
          <br></br>
          <h3 className="text-xl font-semibold mb-4">{title}:</h3>
          <br></br>
          <div className="overflow-x-auto">

            <TableContainer>

              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        {headCell.disableSorting ? (
                          headCell.label
                        ) : (
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={() => handleSortRequest(headCell.id)}
                          >
                            {headCell.label}
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recordsAfterPagingAndSorting.map((dish) => (
                    <React.Fragment key={dish.id}>
                      <TableRow hover>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleRowExpand(dish.name)}
                          >
                            {expandedRow === dish.name ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>{dish.name}</TableCell>
                        <TableCell>{dish.diet}</TableCell>
                        <TableCell>{dish.prep_time}</TableCell>
                        <TableCell>{dish.cook_time}</TableCell>
                        <TableCell>{dish.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={expandedRow === dish.name} timeout="auto" unmountOnExit className="details-collapse">
                            {/* <Box margin={2}> */}
                            {/* <DishDetails id={dish.name} /> */}
                            {/* <strong>Details:</strong> {JSON.stringify(expandedDetails[dish.name], null, 2)} */}
                            <Box className="details-box">
                              <fieldset className="details-fieldset">
                                <legend>
                                  <Typography variant="h6" className="details-title">
                                    {dish.name}
                                  </Typography>
                                </legend>
                                <div className="details-grid">
                                  <div className="details-item">
                                    <strong>Ingredients:</strong>
                                    <span>{dish.ingredients.join(', ')}</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Diet:</strong>
                                    <span>{dish.diet}</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Prep Time:</strong>
                                    <span>{dish.prep_time} mins</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Cooking Time:</strong>
                                    <span>{dish.cook_time} mins</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Flavor:</strong>
                                    <span>{dish.flavor_profile}</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Course:</strong>
                                    <span>{dish.course}</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>State:</strong>
                                    <span>{dish.state}</span>
                                  </div>
                                  <div className="details-item">
                                    <strong>Region:</strong>
                                    <span>{dish.region}</span>
                                  </div>
                                </div>
                              </fieldset>
                            </Box>
                            {/* </Box> */}

                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              page={page}
              rowsPerPageOptions={[5, 10, 25]}
              rowsPerPage={rowsPerPage}
              count={dishes.length}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />


          </div>
        </div>
      )}
    </div>
  )
}

export default DishTable;