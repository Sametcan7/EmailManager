import { useContext } from "react";
import CompanyRecipient from "../../ui/selected-recipients/CompanyRecipient";
import IndividualRecipients from "../../ui/selected-recipients/IndividualRecipients";
import { RiDeleteBin5Line } from "react-icons/ri";

import { CompanyContext, IndividualContext } from "../../context";
import { IconContext } from "react-icons";

export default function SelectedRecipients() {
  const [companyContext, setCompanyContext] = useContext(CompanyContext);
  const [individualContext, setIndividualContext] =
    useContext(IndividualContext);
  console.log(individualContext);
  console.log(companyContext);

  function HandleDeleteAll() {
    setCompanyContext([]);
    setIndividualContext([]);
  }

  return (
    <div className="w-1/2 ">
      <div className="p-6 xl:w-3/5 w-4/5 flex flex-col my-10 h-screen mx-auto overflow-x-auto items-start shadow-2xl">
        <h1 className="text-blue-400 text-2xl font-bold mb-4">
          Selected Recipients
        </h1>
        <button className="ml-auto" onClick={() => HandleDeleteAll()}>
          <IconContext.Provider value={{ size: "2rem" }}>
            <RiDeleteBin5Line />
          </IconContext.Provider>
        </button>
        <div className="ml-[20px] w-4/5">
          {companyContext?.map((email) => (
            <CompanyRecipient
              key={email.company}
              company={email[0]}
              users={email[1]}
            />
          ))}
          <IndividualRecipients user={individualContext} />
        </div>
      </div>
    </div>
  );
}
