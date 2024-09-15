import { useEffect, useState } from "react";
import emails1 from "../../database.json";
import CompanyRecipient from "../../ui/CompanyRecipient";
import IndividualRecipients from "../../ui/IndividualRecipients";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";

export default function AvailableRecipients() {
  const [emails, setEmails] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let searched = emails1.emails.map((element) => {
      return {
        ...element,
        users: element.users.filter((users) =>
          users.mail.toLowerCase().includes(query.toLowerCase())
        ),
      };
    });

    setEmails(searched);
  }, [query]);

  return (
    <div className="w-1/2 text-lg">
      <div className="p-6 xl:w-3/5 w-4/5 flex flex-col my-10 h-screen mx-auto overflow-x-auto items-start shadow-2xl">
        <h1 className="text-blue-400 text-2xl font-bold">
          Available Recipients
        </h1>
        <div className="w-full">
          <form className="py-4 px-2 mb-10 relative">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="search"
              className="h-14 w-full px-16 p-2 border-2 border-black rounded-xl"
              placeholder="Search"
            />
            <span className="absolute left-5 top-[50%] translate-y-[-50%]">
              <IconContext.Provider value={{ size: "2rem" }}>
                <IoIosSearch />
              </IconContext.Provider>
            </span>
          </form>
        </div>
        <div className="ml-[20px] w-4/5">
          {emails?.map((email) =>
            email.company !== null ? (
              email.users.length > 0 ? (
                <CompanyRecipient
                  key={email.company}
                  company={email.company}
                  users={email.users}
                />
              ) : null
            ) : (
              <IndividualRecipients key={email.users.id} user={email.users} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
