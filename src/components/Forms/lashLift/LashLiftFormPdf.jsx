import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { formatPhoneNumber } from "../FormFunctions";

// STYLES
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: "Times-Roman",
  },
  section: {
    marginBottom: 8,
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic", fontSize: 10 },
  logo: {
    height: 144,
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: "26px",
    lineHeight: "32px",
    color: "#704415",
    marginBottom: 2,
  },
  headerSubTitle: {
    fontStyle: "italic",
    fontSize: "20px",
    lineHeight: "32px",
    color: "#956c3f",
  },
  box: {
    backgroundColor: "#f2e8d6",
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  signature: {
    marginTop: 20,
    width: 300,
    height: 75,
  },
  pageNumber: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

// PDF COMPONENT
const LashLiftFormPdf = ({ formData }) => {
  const { page1, page2, page3 } = formData || {};
  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <Image
          src={`${process.env.PUBLIC_URL}/images/logoPdf.png`}
          style={styles.logo}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EYELASH LIFT + TINT</Text>
          <Text style={styles.headerSubTitle}>
            Personal Information + Lash History
          </Text>
        </View>

        {/* First + Last Name */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Name:</Text> {page1.firstName}{" "}
            {page1.lastName}
          </Text>
        </View>

        {/* Date of Birth */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Date of Birth:</Text> {page1.dateOfBirth}
          </Text>
        </View>
        {/* Gender */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Gender:</Text> {page1.gender}
          </Text>
        </View>
        {/* Address */}
        {page1.address && (
          <View style={styles.section}>
            <Text>
              <Text style={styles.bold}>Address:</Text> {page1.address}
              {(page1.city || page1.state || page1.zipCode) && (
                <Text>
                  ,{" "}
                  {[page1.city, page1.state, page1.zipCode]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              )}
            </Text>
          </View>
        )}

        {/* Email */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Email:</Text> {page1.email}
          </Text>
        </View>

        {/* Phone */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Phone Number:</Text>{" "}
            {formatPhoneNumber(page1.phone)}
          </Text>
        </View>

        {/* Heard */}
        {page1.heard && (
          <View style={styles.section}>
            <Text style={styles.bold}>How did you hear about us?</Text>
            <Text>{page1.heard}</Text>
          </View>
        )}

        {/* Photo consent */}
        <View style={styles.section}>
          <Text style={styles.bold}>
            Are you comfortable with us taking and sharing pictures of your
            service results on our social media or website?
          </Text>
          <Text>{page1.photoConsent}</Text>
        </View>

        {/* Lash history */}
        <View style={styles.box}>
          <View style={styles.section}>
            <Text style={styles.bold}>Have you had eyelash lift before?</Text>
            <Text>{page1.lashesBefore}</Text>

            {page1.lashesBefore === "Yes" && (
              <Text>
                <Text style={styles.bold}>Where:</Text> {page1.whereApplied}
              </Text>
            )}
          </View>

          {/* Product usage */}
          <View style={styles.section}>
            <Text style={styles.bold}>
              Which products do you use on your eyelashes?
            </Text>
            <Text>
              {page1.products === "Other" ? page1.otherProduct : page1.products}
            </Text>
          </View>
        </View>

        <Text style={styles.pageNumber}>1/3</Text>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EYELASH LIFT + TINT</Text>
          <Text style={styles.headerSubTitle}>Medical History</Text>
        </View>

        {/* Conditions */}
        {Array.isArray(page2.conditions) && page2.conditions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.bold}>Medical conditions:</Text>
            <Text>{page2.conditions.join(", ")}</Text>
          </View>
        )}

        {/* Latex Allergy */}
        <View style={styles.section}>
          <Text style={styles.bold}>Are you allergic to acrylic or latex?</Text>
          <Text>{page2.latexAllergy}</Text>
        </View>

        {/* More Allergies */}
        <View style={styles.section}>
          <Text style={styles.bold}>Do you have any other allergies?</Text>
          <Text>{page2.moreAllergies}</Text>
        </View>

        {/* Other Allergies */}
        {page2.moreAllergies === "Yes" && (
          <Text>
            <Text style={styles.bold}>Other Allergies:</Text>{" "}
            {page2.otherAllergies}
          </Text>
        )}

        {/* Pregnant */}
        <View style={styles.section}>
          <Text style={styles.bold}>Are you, or could you be pregnant?</Text>
          <Text>{page2.pregnant}</Text>
        </View>

        {/* Glasses */}
        <View style={styles.section}>
          <Text style={styles.bold}>Do you wear glasses?</Text>
          <Text>{page2.glasses}</Text>
        </View>

        {/* Lenses */}
        <View style={styles.section}>
          <Text style={styles.bold}>Do you wear lenses?</Text>
          <Text>{page2.lenses}</Text>
        </View>

        {/* Eye Illness */}
        <View style={styles.section}>
          <Text style={styles.bold}>
            Do you have, or are you being treated for any eye illness/injury?
          </Text>
          <Text>{page2.eyeIllness}</Text>
        </View>

        {/* Watery eyes */}
        <View style={styles.section}>
          <Text style={styles.bold}>
            Do you often have eye irritation, itching or watery eyes?
          </Text>
          <Text>{page2.wateryEyes}</Text>
        </View>

        {/* Medications */}
        {page2.medications && (
          <Text>
            <Text style={styles.bold}>
              Medications or supplements taken regularly:
            </Text>{" "}
            {page2.medications}
          </Text>
        )}

        <Text style={styles.pageNumber}>2/3</Text>
      </Page>

      {/* PAGE 3 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EYELASH LIFT + TINT</Text>
          <Text style={styles.headerSubTitle}>Consent + Liability</Text>
        </View>

        {/* Consent Text */}
        <View style={styles.box}>
          {Array.isArray(page3.consents) ? (
            page3.consents.map((text, i) => (
              <Text key={i} style={{ marginBottom: 6, fontSize: 10 }}>
                • {text}
              </Text>
            ))
          ) : (
            <Text>No consents available.</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.checkboxRow}>
            <Image
              src={`${process.env.PUBLIC_URL}/images/checkmark.png`}
              style={{ width: 14, height: 14, marginTop: 2 }}
            />
            <Text style={{ flex: 1 }}>
              I have read and fully understand all information in this
              agreement. I consent to the agreement and to the eyelash lift
              application procedure.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Initials: </Text>
            {page3.initials}
          </Text>
          <Text>
            <Text style={styles.bold}>Date: </Text>
            {page3.submissionDate}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.italic}>
            By signing below, you agree to the following: I have completed this
            form truthfully and to the best of my knowledge. I agree to inform
            the technician of any changes in the above information. I agree to
            waive all liabilities toward my technician and Garden and Bee LLC.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.section}>
          <Text style={styles.bold}>Client Signature:</Text>
          <Image src={page3.signature} style={styles.signature} />
        </View>

        <Text style={styles.pageNumber}>3/3</Text>
      </Page>
    </Document>
  );
};

export default LashLiftFormPdf;
