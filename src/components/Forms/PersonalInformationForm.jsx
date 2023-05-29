import React, { useState } from "react";
import {
  Form,
  Field,
  Label,
  FormControlers,
  Submit,
  Exit,
  BreakLine,
} from "./AddProductForm";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { Right, Header, Container } from "../../pages/Stock";
import { Title, Desc } from "../../pages/Settings";
import { Link } from "react-router-dom";
function PersonalInformationForm() {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  return (
    <>
      <Container>
        <Sidebar defaultPage="Settings" />
        <Right>
          <Header>
            <Topbar title="Paramétres" state="desabled" />
          </Header>
          <BreakLine style={{ marginTop: "0px" }} />

          <Title>Compte</Title>
          <Desc style={{ marginBottom: "12px" }}>
            Modifier les information de proprétaire
          </Desc>

          <Form>
            <Label>
              Prénom
              <Field
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Wahid"
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
              Nom d'utilisateur
              <Field
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="WahidSli312"
                required
              />
            </Label>
            <Label>
              Numéro de télèphone
              <Field
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber > 0 ? phoneNumber : ""}
                placeholder="54129179"
                required
              />
            </Label>
            <Label>
              Adresse email
              <Field
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="wahids@gmail.com"
                required
              />
            </Label>
            <Label>
              Lieu
              <Field
                type="text"
                onChange={(e) => setAdress(e.target.value)}
                value={adress}
                placeholder="Béjaia"
                required
              />
            </Label>

            <FormControlers
              style={{ placeSelf: "center", position: "relative", left: "50%" }}
            >
              <Link
                exact="true"
                to="/Settings"
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

export default PersonalInformationForm;
