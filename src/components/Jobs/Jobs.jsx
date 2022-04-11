import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { MyContext } from "../../App";
import "./jobs.css";
import { Link } from "react-router-dom";
import * as api from "../../api/index";
import * as actions from "../../actionTypes/actionTypes";

export default function BasicTable({ data }) {
  const { jobsDispatch } = useContext(MyContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer className="section__padding table_container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <span className="heading">Company</span>
            </TableCell>
            <TableCell align="center">
              <span className="heading">Position</span>
            </TableCell>
            <TableCell align="center">
              <span className="heading"> Date Applied</span>
            </TableCell>
            <TableCell align="center">
              <span className="heading">Status</span>
            </TableCell>
            <TableCell align="center">
              <span className="heading">Actions</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  {moment(row.date)
                    .toLocaleString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <div>
                    {" "}
                    <Link to={`/update/${row._id}`}>
                      <button className="edit" to={`/update/${row._id}`}>
                        edit
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={async () => {
                        const { data } = await api.deleteJob(row._id);
                        jobsDispatch({
                          type: actions.DELETE_JOB,
                          payload: data.data,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
