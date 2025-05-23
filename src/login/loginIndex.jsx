import React, { useEffect, useState } from "react";
import Login from "./login";

import ErrorBoundary from "../hooks/ErrorBoundery";
import Navbar from "../header/navbar";


export default function LoginIndex() {
  return (
    <ErrorBoundary>
      <Navbar />
      <div className="mx-auto max-w-9/10">
        <Login />
      </div>
    </ErrorBoundary>
  );
}
