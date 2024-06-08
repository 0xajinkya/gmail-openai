"use client";

import { Box } from "@mui/material";
import { NotLogin } from "../NotLogin";
import { useContext } from "react";
import { Header } from "../Header";
import { GlobalContext, HomeContext } from "@/context";
import { ActionSec } from "../ActionSec";
import { Emails } from "../Emails";
import { Paging } from "../Paging";
import { EmailModal } from "../EmailModal";
import { IUser } from "@/utils";

/**
 * Component for rendering the home page.
 * It displays the header, action section, list of emails, pagination controls,
 * and an optional email modal.
 */
export const HomePage = () => {
  const { user, logOut } = useContext(GlobalContext);
  const {
    total,
    changeTotal,
    emails,
    loading,
    page,
    prevPage,
    nextPage,
    classify,
    setActiveEmail,
    activeEmail,
  } = useContext(HomeContext);

  return (
    <Box>
      {/* Render not logged in message if user is not logged in */}
      {!user ? (
        <NotLogin />
      ) : (
        <Box
          sx={{
            width: ["90vw", "60vw"],
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Render header */}
          <Header user={user as IUser} logOut={logOut} />
          {/* Render action section for changing total emails and classification */}
          <ActionSec
            handleChange={(e) => changeTotal(Number(e.target.value))}
            num={total}
            classify={classify}
          />
          {/* Render list of emails */}
          <Emails
            emails={emails}
            loading={loading}
            setActiveEmail={setActiveEmail}
          />
          {/* Render pagination controls */}
          <Paging page={page} nextPage={nextPage} prevPage={prevPage} />
          {/* Render email modal if there is an active email */}
          {activeEmail !== null && <EmailModal activeEmail={activeEmail} setActiveEmail={setActiveEmail}/>}
        </Box>
      )}
    </Box>
  );
};
