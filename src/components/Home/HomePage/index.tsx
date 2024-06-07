"use client";

import { getAccessToken, getUser } from "@/lib";
import { Box } from "@mui/material";
import { NotLogin } from "../NotLogin";
import { useContext, useEffect, useState } from "react";
import { Header } from "../Header";
import { GlobalContext, HomeContext, IUser } from "@/context";
import { ActionSec } from "../ActionSec";
import { Emails } from "../Emails";
import { Paging } from "../Paging";

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
  } = useContext(HomeContext);

  return (
    <Box>
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
          <Header user={user as IUser} logOut={logOut} />
          <ActionSec
            handleChange={(e) => changeTotal(Number(e.target.value))}
            num={total}
            classify={classify}
          />
          <Emails emails={emails} loading={loading} />
          <Paging page={page} nextPage={nextPage} prevPage={prevPage} />
        </Box>
      )}
    </Box>
  );
};
