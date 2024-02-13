"use client";

import { Route, Routes } from "react-router-dom";
import { ReactElement } from "react";
import Signup from "./pages/signup";
import Home from "./pages/home";
import NotFound from "./pages/notFound";


const AppRouter = (): ReactElement => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/share" element={<SharePage />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/user" element={<UserSettings />} />
        <Route path="/import-export" element={<ImportExport />} />
        <Route path="/categories" element={<Categories />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  
  export default AppRouter;