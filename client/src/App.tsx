import {
  Button,
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import EditOfficer from "./components/editOfficer/editOfficer";

const ENDPOINTS = {
  CLINICS: "clinics",
  NURSES: "nurses",
  VACCINES: "vaccines",
  PATIENTS: "patients",
  VACCINES_HISTORY: "vaccineshistory",
};

const idMaps = {
  [ENDPOINTS.CLINICS]: "clinic_id",
  [ENDPOINTS.NURSES]: "nurse_id",
  [ENDPOINTS.VACCINES]: "vaccine_id",
  [ENDPOINTS.PATIENTS]: "patient_id",
  [ENDPOINTS.VACCINES_HISTORY]: "PK_VaccineHistory",
};

const baseUrl = "http://localhost:4000/";

function App() {
  const [selectedTable, setSelectedTable] = useState(ENDPOINTS.CLINICS);
  const [rows, setRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    fetchData(selectedTable);
  }, [selectedTable]);

  const fetchData = async (endpoint: string) => {
    try {
      const data = await axios.get(baseUrl + endpoint);
      setRows(data.data);
      console.log(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteRow = async (id: any) => {
    try {
      await axios.delete(baseUrl + selectedTable + `/${id}`);
      const tempRows = rows.filter((x) => x[idMaps[selectedTable]] !== id);
      setRows(tempRows);
    } catch (e) {
      console.error(e);
    }
  };

  const editRow = async (id: any, body: any) => {
    try {
      await axios.put(baseUrl + selectedTable + `/${id}`, body);
      const tempRows: any = rows.map((x: any) => {
        if (x[idMaps[selectedTable]] === id) {
          return { ...x, ...body };
        }
        return x;
      });
      setRows(tempRows);
      setIsEdit(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <h1>StaySafe</h1>
      </div>
      <div className="button-wrapper">
        <Button variant="contained" onClick={() => setSelectedTable(ENDPOINTS.CLINICS)}>
          Clinics
        </Button>
        <Button variant="contained" onClick={() => setSelectedTable(ENDPOINTS.NURSES)}>
          Nurses
        </Button>
        <Button variant="contained" onClick={() => setSelectedTable(ENDPOINTS.PATIENTS)}>
          Patients
        </Button>
        <Button variant="contained" onClick={() => setSelectedTable(ENDPOINTS.VACCINES)}>
          Vaccines
        </Button>
        <Button variant="contained" onClick={() => setSelectedTable(ENDPOINTS.VACCINES_HISTORY)}>
          Vaccines history
        </Button>
      </div>
      <div>
        {rows.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(rows[0]).map((x) => (
                    <TableCell>{x}</TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => {
                  return (
                    <TableRow key={row[idMaps[selectedTable]]}>
                      {Object.keys(row).map((x) => (
                        <TableCell>{row[x]}</TableCell>
                      ))}
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setSelectedRow(row);
                            setIsEdit(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteRow(row[idMaps[selectedTable]])}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="noData">No data</div>
        )}
      </div>
      <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
        <EditOfficer
          setIsEdit={setIsEdit}
          data={selectedRow}
          endpoint={baseUrl + selectedTable}
          edifOfficer={editRow}
        ></EditOfficer>
      </Dialog>
    </div>
  );
}

export default App;
