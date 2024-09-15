import { useState } from "react";
import AvailableRecipients from "./components/available-recipients/AvailableRecipients";
import SelectedRecipients from "./components/selected-recipients/SelectedRecipients";
import { CompanyContext, IndividualContext } from "./context";

function App() {
  const [companyContext, setCompanyContext] = useState([]);
  const [individualContext, setIndividualContext] = useState([]);
  console.log(companyContext);
  console.log(individualContext);
  return (
    <div className="bg-zinc-300 flex w-full ">
      <CompanyContext.Provider value={[companyContext, setCompanyContext]}>
        <IndividualContext.Provider
          value={[individualContext, setIndividualContext]}
        >
          <AvailableRecipients />
          <SelectedRecipients />
        </IndividualContext.Provider>
      </CompanyContext.Provider>
    </div>
  );
}

export default App;
