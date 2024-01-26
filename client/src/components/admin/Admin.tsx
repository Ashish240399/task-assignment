"use client";
import { getAllTask } from "@/services/getAllTask";
import React, { useEffect, useState } from "react";

function Admin() {
  const [allTasks, setAllTasks] = useState([]);
  const [filters, setFilters] = useState({
    created_by: undefined,
    assigned_to: undefined,
    status: undefined,
    search: undefined,
  });
  useEffect(() => {
    getAllTaskFn();
  }, []);

  async function getAllTaskFn() {
    const result = await getAllTask(filters);
    setAllTasks(result);
  }
  console.log(allTasks);
  return <div></div>;
}

export default Admin;
