import React, { useState } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { SearchBox, Image } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";

const items = [
  {
    name: "ATT",
    src: "../src/assets/att.svg",
    alt: "ATT"
  },  
  {
    name: "SwiftRide",
    src: "../src/assets/logo-bike.svg",
    alt: "SwiftRide"
  },

  {
    name: "Apple",
    src: "../src/assets/apple.svg",
    alt: "Apple"
  },

  {
    name: "Lululemon",
    src: "../src/assets/lululemon.png",
    alt: "Lululemon"
  },
  {
    name: "Microsoft",
    src: "../src/assets/microsoft.png",
    alt: "Microsoft"
  },
  {
    name: "Nike",
    src: "../src/assets/nike.svg",
    alt: "Nike"
  }
];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setFilteredItems(filtered);
  };
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        {/* <p className="getStarted">Connect an account</p> */}
        <SearchBox
          contentBefore={<SearchRegular />}
          placeholder="Search"
          className="searchBox"
          onChange={handleSearch} 
          value={searchTerm}
        />
        <p className="providers">All Providers</p>
        <table>
        {filteredItems.map((item) => (
           <div className="content">
            <tr>
              <td>
              <Image key={item.name} className="logo" src={item.src} alt={item.alt} />
              </td>
              <td>{item.name}</td>
            </tr>
             </div>
          ))}
        </table>
      </div>
    </FluentProvider>
  );
}

export default Dashboard;
