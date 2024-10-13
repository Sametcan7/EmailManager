/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../../context";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

export default function CompanyRecipient({ company, users }) {
  const [isOpen, setIsOpen] = useState(false);
  const [companyContext, setCompanyContext] = useContext(CompanyContext);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    setTeam([company, users]);
  }, [setTeam, company, users]);

  function handleOpen(e) {
    e.preventDefault();
    setIsOpen((open) => !open);
  }

  function HandleAdd() {
    if (companyContext.filter((e) => e[0] == company).length > 0) {
      return;
    } else {
      setCompanyContext([...companyContext, team]);
    }
  }

  const addById = (newPersonId, email, companyName) => {
    const user = { id: newPersonId, mail: email };

    setCompanyContext((prevState) => {
      const companyIndex = prevState.findIndex(
        (company) => company[0] === companyName
      );

      if (companyIndex !== -1) {
        const company = prevState[companyIndex];
        const userExists = company[1].some(
          (person) => person.id === newPersonId
        );

        if (!userExists) {
          const updatedCompany = [company[0], [...company[1], user]];
          return [
            ...prevState.slice(0, companyIndex),
            updatedCompany,
            ...prevState.slice(companyIndex + 1),
          ];
        } else {
          return prevState;
        }
      } else {
        return [...prevState, [companyName, [user]]];
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col mb-10">
        <h2 className=" items-center px-2 flex  justify-around py-3 border-2 border-black rounded-xl w-4/5 relative">
          <span>
            <IconContext.Provider value={{ size: "2.5rem" }}>
              {isOpen ? (
                <button onClick={(e) => handleOpen(e)}>
                  <MdOutlineKeyboardArrowDown />
                </button>
              ) : (
                <button onClick={(e) => handleOpen(e)}>
                  <MdOutlineKeyboardArrowRight />
                </button>
              )}
            </IconContext.Provider>
          </span>
          {company}
          <span className=" flex ">
            <button
              className="mr-5"
              onClick={() => {
                HandleAdd();
              }}
            >
              <IconContext.Provider value={{ size: "1.5rem" }}>
                <IoSendSharp />
              </IconContext.Provider>
            </button>
          </span>
        </h2>

        {isOpen ? (
          <ul className="w-[70%] ml-5 border-b-2 border-l-2 border-r-2 border-black rounded-xl">
            {users.map((user) => {
              return (
                <li className="relative hover:bg-white" key={user.id}>
                  {user.mail}
                  <div className="absolute flex gap-1 right-2 top-[50%] translate-y-[-50%]">
                    <button
                      onClick={() => addById(user.id, user.mail, company)}
                    >
                      <IconContext.Provider value={{ size: "1.1rem" }}>
                        <IoSendSharp />
                      </IconContext.Provider>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
