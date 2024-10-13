/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../../context";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosBackspace } from "react-icons/io";

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

  function HandleDelete(company) {
    setCompanyContext((prevState) => prevState.filter((e) => e[0] !== company));
  }

  function HandleAddIndividual(id) {
    setCompanyContext((prevState) =>
      prevState.map((company) => [
        company[0],
        company[1].filter((person) => person.id !== id),
      ])
    );
  }

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
            <button onClick={() => HandleDelete(company)}>
              <IconContext.Provider value={{ size: "1.8rem" }}>
                <IoIosBackspace />
              </IconContext.Provider>
            </button>
          </span>
        </h2>

        {isOpen ? (
          <ul className="w-[70%] ml-5 border-b-2 border-l-2 border-r-2 border-black rounded-xl">
            {users.map((user) => {
              return (
                <li className="relative hover:bg-white rounded-xl" key={user.id}>
                  {user.mail}
                  <div className="absolute flex gap-1 right-2 top-[50%] translate-y-[-50%]">
                    <button onClick={() => HandleAddIndividual(user.id)}>
                      <IconContext.Provider value={{ size: "1.3rem" }}>
                        <IoIosBackspace />
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
