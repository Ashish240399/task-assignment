"use client";
import { addTask } from "@/services/addTask";
import { getAllEmployee } from "@/services/getAllEmployee";
import { getAllTask } from "@/services/getAllTask";
import { updateTask } from "@/services/updateTask";
import { changeDateFormat } from "@/utils/changeDateFormat";
import React, { useEffect, useState } from "react";

function Admin() {
  const [allTasks, setAllTasks] = useState([]);
  const [emplyeeList, setEmployeeList] = useState([]);
  const [taskUpdate, setTaskUpdate] = useState(false);
  const [editTitle, setEditTitle] = useState({ id: "", title: "" });
  const [taskObject, setTaskObject] = useState({
    title: "",
    created_by: "admin@gmail.com",
    assigned_to: "",
    expires_at: "",
  });
  const [filters, setFilters] = useState({
    created_by: undefined,
    assigned_to: undefined,
    status: undefined,
    search: undefined,
  });
  useEffect(() => {
    getAllTaskFn();
    getAllEmployeeListFn();
  }, [filters]);

  async function getAllTaskFn() {
    const result = await getAllTask(filters);
    setAllTasks(result);
    setTaskUpdate(false);
  }

  async function getAllEmployeeListFn() {
    const result = await getAllEmployee();
    setEmployeeList(result);
  }

  async function addTaskFn() {
    const result = await addTask(taskObject);
    console.log(result);
    setTaskUpdate(true);
  }

  async function updateTaskFn(
    taskId: number,
    taskKey: string,
    taskValue: string
  ) {
    const result = await updateTask(taskId, taskKey, taskValue);
    if (result.status == 200) {
      setTaskUpdate(true);
      setEditTitle({
        id: "",
        title: "",
      });
    }
  }
  useEffect(() => {
    if (taskUpdate) {
      getAllTaskFn();
    }
  }, [taskUpdate]);
  console.log(taskObject);

  return (
    <div className="h-full w-full bg-slate-500 flex items-center justify-between gap-[20px] overflow-auto px-4 py-3">
      <div className="w-[30%] p-[30px] flex flex-col gap-4 border border-white rounded-lg">
        <div className="text-[19px] font-bold mb-2 text-blue-950">
          Assign Task
        </div>
        <input
          className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none"
          onChange={(e) => {
            setTaskObject({ ...taskObject, title: e.target.value });
          }}
          type="text"
          placeholder="Title"
        />
        <select
          className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none"
          onChange={(e) => {
            setTaskObject({ ...taskObject, assigned_to: e.target.value });
          }}
          name="Employee List"
        >
          <option value="">Select Employee</option>
          {emplyeeList?.map((el: any) => (
            <option value={el.email}>{el.name}</option>
          ))}
        </select>
        <input
          className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none"
          onChange={(e) => {
            setTaskObject({ ...taskObject, expires_at: e.target.value });
          }}
          type="datetime-local"
          name=""
          id=""
        />
        <button
          disabled={
            taskObject.expires_at != "" &&
            taskObject.title != "" &&
            taskObject.assigned_to != ""
              ? false
              : true
          }
          className="px-5 py-2 rounded-lg bg-green-500 text-white hover:cursor-pointer"
          onClick={() => {
            if (
              taskObject.expires_at != "" &&
              taskObject.title != "" &&
              taskObject.assigned_to != ""
            ) {
              addTaskFn();
            }
          }}
        >
          Submit
        </button>
      </div>
      <div className="w-[70%] p-[30px] flex flex-col gap-4 border border-white rounded-lg h-[90vh] overflow-hidden">
        <div>
          <div className="text-[19px] font-bold mb-2 text-blue-950">
            Filter Options
          </div>
          <div className="flex justify-between items-center gap-3">
            <input
              className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none w-full h-[40px]"
              onChange={(e: any) => {
                setFilters({ ...filters, search: e.target.value });
              }}
              type="search"
              name=""
              id=""
              placeholder="Search Title"
            />
            <select
              className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none w-full h-[40px]"
              onChange={(e: any) => {
                setFilters({ ...filters, status: e.target.value });
              }}
            >
              <option value={""}>All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              className="bg-sky-200 text-black px-5 py-2 rounded-lg focus:outline-none w-full h-[40px]"
              onChange={(e: any) => {
                setFilters({ ...filters, assigned_to: e.target.value });
              }}
              name="Employee List"
            >
              <option value={""}>All</option>
              {/* <option value={el.assigned_to}>{el.assigned_to}</option> */}
              {emplyeeList?.map((empObj: any) => (
                <option value={empObj.id}>{empObj.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[90%] overflow-auto">
          <div className="flex justify-between items-center gap-2">
            <div className="border w-full p-2">Admin Id</div>
            <div className="border w-full p-2">Title</div>
            <div className="border w-full p-2">Employee</div>
            <div className="border w-full p-2">Timelione</div>
            <div className="border w-full p-2">Status</div>
          </div>
          <div className="w-full ">
            {allTasks?.map((el: any) => (
              <div className="flex justify-between items-center gap-2 w-full text-[12px]">
                <div className=" w-[25%] p-2">{el.created_by}</div>
                <div className=" w-[25%] p-2">
                  <input
                    className="bg-transparent text-white"
                    value={editTitle.id == el.id ? editTitle.title : el.title}
                    type="text"
                    name=""
                    id=""
                    onFocus={() => {
                      setEditTitle({
                        id: el.id,
                        title: el.title,
                      });
                    }}
                    onChange={(e) =>
                      setEditTitle({ ...editTitle, title: e.target.value })
                    }
                    onKeyDown={(e) => {
                      e.key == "Enter" &&
                        updateTaskFn(el.id, "title", editTitle.title);
                    }}
                  />
                </div>
                <div className=" w-[25%] p-2">
                  <select
                    className="bg-sky-200 text-black p-1 focus:outline-none w-[100%] overflow-hidden "
                    onChange={(e) => {
                      updateTaskFn(el.id, "assigned_to", e.target.value);
                    }}
                    name="Employee List"
                    value={el.assigned_to}
                  >
                    {/* <option value={el.assigned_to}>{el.assigned_to}</option> */}
                    {emplyeeList?.map((empObj: any) => (
                      <option value={empObj.id}>{empObj.name}</option>
                    ))}
                  </select>
                </div>
                <div className=" w-[25%]">
                  <input
                    className="bg-sky-200 text-black p-1 focus:outline-none w-[100%] overflow-hidden "
                    value={changeDateFormat(el.expires_at, "Asia/Kolkata")}
                    type="datetime-local"
                    name=""
                    id=""
                    onChange={(e) => {
                      updateTaskFn(el.id, "expires_at", e.target.value);
                    }}
                  />
                </div>
                <div className=" w-[25%] p-2">
                  <select
                    className="bg-sky-200 text-black p-1 focus:outline-none w-[100%] overflow-hidden "
                    onChange={(e) => {
                      updateTaskFn(el.id, "status", e.target.value);
                    }}
                    name="Employee List"
                    value={el.status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
