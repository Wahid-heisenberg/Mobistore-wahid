import React from "react";
import { Link } from "react-router-dom";
import { Container, Title, Qst, Hr } from "./RightUp";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
function Restore() {
  return (
    <>
      <Container>
        <Title>
          <KeyIcon style={{ fontSize: "60px", transform: "rotate(32deg)" }} />{" "}
          Récupérer votre compte
        </Title>
        <h4>Contactez nous, Pour récupérer votre compte</h4>
        <h2>Signaler le problème</h2>
        <h1 className="Email">
          <EmailIcon style={{ fontSize: "48px" }} />
          projet2023@gmail.com
        </h1>
        <Hr />
        <Qst style={{ marginTop: "36px" }}>
          {" "}
          Vous avez déja un compte ?
          <Link exact to="/SignIn" style={{ textDecoration: "none" }}>
            <span
              style={{ color: "#21d8fd", cursor: "pointer", marginLeft: "6px" }}
            >
              Se connecter ici
            </span>
          </Link>
        </Qst>
      </Container>
    </>
  );
}

export default Restore;
