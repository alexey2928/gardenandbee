import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../common/firebase";
import { pdf } from "@react-pdf/renderer";
import { SlPrinter } from "react-icons/sl";
import { FaWpforms } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";

import LashLiftFormPdf from "../Forms/lashLift/LashLiftFormPdf";
import LashExtFormPdf from "../Forms/lashExt/LashFormPdf";
import MenuHeader from "../../common/MenuHeader";
import { formatServiceName } from "../Forms/FormFunctions";

import FormModal from "./FormModal";
import FormViewRenderer from "./FormViewRenderer";
import ThreadingWaxingPdf from "../Forms/threadingWaxing/ThreadingWaxingPdf";
import BrowShapingPdf from "../Forms/browShaping/BrowShapingPdf";

const AdminPage = () => {
  const [groupedForms, setGroupedForms] = useState({});
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const submittedFormsRef = collection(
          db,
          "forms",
          "allForms",
          "submittedForms"
        );
        const q = query(submittedFormsRef, orderBy("name", "asc"));
        const snapshot = await getDocs(q);

        const groups = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!groups[data.name]) groups[data.name] = [];
          groups[data.name].push({ id: doc.id, ...data });
        });

        setGroupedForms(groups);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forms:", error);
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleView = (form) => {
    if (!form) return;
    setSelectedForm(form);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const handlePrint = async (form) => {
    try {
      let Component;

      switch (form.service) {
        case "browShapingForm":
          Component = <BrowShapingPdf formData={form.formData} />;
          break;
        case "eyelashLiftForm":
          Component = <LashLiftFormPdf formData={form.formData} />;
          break;
        case "eyelashExtensionForm":
          Component = <LashExtFormPdf formData={form.formData} />;
          break;
        case "threadingWaxingForm":
          Component = <ThreadingWaxingPdf formData={form.formData} />;
          break;
        default:
          console.warn("Unknown service type:", form.service);
          return;
      }

      const blob = await pdf(Component).toBlob();
      const fileName = `${form.name}_${form.service}.pdf`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <div>
      <MenuHeader name="Submitted Forms" />

      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          maxHeight: "75vh",
          overflowX: "auto",
          position: "relative",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "primary_dark",
                  position: "sticky",
                  left: 0,
                  backgroundColor: "white/70",
                  zIndex: 5,
                }}
              >
                Name
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", color: "primary_dark" }}>
                Service
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", color: "primary_dark" }}>
                Submitted At
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "primary_dark",
                  position: "sticky",
                  right: 0,
                  backgroundColor: "background.paper",
                  zIndex: 5,
                  textAlign: "right",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(groupedForms).map(([name, forms]) => (
              <React.Fragment key={name}>
                {forms.map((form, index) => (
                  <TableRow key={form.id}>
                    {/* Sticky left Name column */}
                    {index === 0 && (
                      <TableCell
                        rowSpan={forms.length}
                        sx={{
                          fontWeight: 600,
                          position: "sticky",
                          left: 0,
                          backgroundColor: "background.paper",
                          zIndex: 4,
                        }}
                      >
                        {name}
                      </TableCell>
                    )}

                    <TableCell>{formatServiceName(form.service)}</TableCell>

                    <TableCell>
                      {form.createdAt?.toDate
                        ? form.createdAt.toDate().toLocaleString()
                        : "—"}
                    </TableCell>

                    {/* Sticky right Actions column */}
                    <TableCell
                      sx={{
                        position: "sticky",
                        right: 0,
                        backgroundColor: "background.paper",
                        zIndex: 4,
                      }}
                    >
                      <div className="flex justify-end items-center gap-4">
                        <IconButton onClick={() => handleView(form)}>
                          <FaWpforms size={22} style={{ color: "#704415" }} />
                        </IconButton>

                        <IconButton onClick={() => handlePrint(form)}>
                          <SlPrinter size={22} style={{ color: "#704415" }} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title={
          selectedForm
            ? `View Submitted ${formatServiceName(selectedForm.service)} Form`
            : "View Submitted Form"
        }
      >
        {selectedForm && <FormViewRenderer form={selectedForm} />}
      </FormModal>
    </div>
  );
};

export default AdminPage;
