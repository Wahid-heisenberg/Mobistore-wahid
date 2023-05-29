import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { Right, Header, Container } from "../../pages/Stock";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Question,
  Form,
  Field,
  Label,
  FormControlers,
  Submit,
  Exit,
  BreakLine,
} from "./AddProductForm";
function AddWorkerForm() {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [workHoures, setUserWorkHoures] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  console.log(familyName, workHoures, email);

  console.log("here");

  const handleSubmit = (event) => {
    event.preventDefault();

    const WorkertData = {
      firstName: firstName,
      familyName: familyName,
      email: email,
      phoneNumber: phoneNumber,
      workHoures: workHoures,
    };
    console.log("thagui");
    // Make HTTP request to backend API to insert form data into database
    axios
      .post("http://localhost:5000/api/worker/addworker", WorkertData)
      .then((response) => {
        console.log(response.data);
        alert("travalleur ajouter avec success");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the user.");
      });
  };

  return (
    <>
      <Container>
        <Sidebar defaultPage="Profile" />
        <Right>
          <Header>
            <Topbar title="Profile" state="desabled" />
          </Header>
          <Question>Voulez entrez les informations des travailleurs</Question>
          <BreakLine style={{ marginTop: "-16px" }} />
          <Form onSubmit={handleSubmit}>
            <Label>
              Prénom
              <Field
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="wahid"
                required
              />
            </Label>
            <Label>
              Nom
              <Field
                type="text"
                onChange={(e) => setFamilyName(e.target.value)}
                value={familyName}
                placeholder="Slimani"
                required
              />
            </Label>
            <Label>
              Adresse email
              <Field
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="wahidslimani@gmail.com"
                required
              />
            </Label>
            <Label>
              Numéro de telephone
              <Field
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber > 0 ? phoneNumber : ""}
                placeholder="0541129179"
                required
              />
            </Label>
            <Label>
              Horaires
              <Field
                type="text"
                onChange={(e) => setUserWorkHoures(e.target.value)}
                value={workHoures}
                placeholder="8h-16h"
                required
              />
            </Label>
            <FormControlers>
              <Link
                exact="true"
                to="/Profile"
                style={{ textDecoration: "none" }}
              >
                <Exit> Annuler</Exit>
              </Link>
              <Submit type="submit" value="enregistré" />
            </FormControlers>
          </Form>
        </Right>
      </Container>
    </>
  );
}

export default AddWorkerForm;
