import React from "react";
import Sidebar from "../../components/Sidebar";
import DataTable from "../../components/DataTable";


import "./styles/styles.css"

const Books = () => {
  return (
    <div>
      <DataTable />
    </div>
  );
};

const BookInSidebar = () => <Sidebar Content={Books} />;

export default BookInSidebar;
