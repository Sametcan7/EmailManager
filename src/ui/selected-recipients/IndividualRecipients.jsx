/* eslint-disable react/prop-types */
import { useContext } from "react";
import { IndividualContext } from "../../context";
import { IconContext } from "react-icons";
import { IoIosBackspace } from "react-icons/io";

export default function IndividualRecipients({ user }) {
  const [individualContext, setIndividualContext] =
    useContext(IndividualContext);

  console.log(individualContext);

  function HandleDelete(id) {
    setIndividualContext((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1 className="text-blue-400 text-2xl font-bold mb-4">
        Individual Recipients
      </h1>
      <ul>
        {user?.map((user) => (
          <li className="relative justify-between flex p-2" key={user.id}>
            {user.mail}
            <div className=" flex">
              <button onClick={() => HandleDelete(user.id)}>
                <IconContext.Provider value={{ size: "1.3rem" }}>
                  <IoIosBackspace />
                </IconContext.Provider>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
