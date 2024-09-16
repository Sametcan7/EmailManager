/* eslint-disable react/prop-types */
import { useContext } from "react";
import { IndividualContext } from "../../context";
import { IconContext } from "react-icons";
import { IoSendSharp } from "react-icons/io5";

export default function IndividualRecipients({ user }) {
  const [individualContext, setIndividualContext] =
    useContext(IndividualContext);

  console.log(individualContext);

  function HandleAdd(id, mail) {
    let user = { id, mail };
    let filter = individualContext.filter((us) => us.id === user.id);

    if (filter.length === 0) {
      setIndividualContext((prev) => [...prev, user]);
    }
  }

  return (
    <ul>
      {user?.map((user) => (
        <li className="relative justify-between flex p-2" key={user.id}>
          {user.mail}
          <div className=" flex">
            <button onClick={() => HandleAdd(user.id, user.mail)}>
              <IconContext.Provider value={{ size: "1.1rem" }}>
                <IoSendSharp />
              </IconContext.Provider>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
