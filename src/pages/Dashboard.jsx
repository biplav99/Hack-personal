import React, { useState } from "react";
import { FluentProvider, webLightTheme, Button } from "@fluentui/react-components";
import { SearchBox, Image } from "@fluentui/react-components";
import { SearchRegular, AddRegular, HomeRegular, SettingsRegular } from "@fluentui/react-icons";
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';


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
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // For floating button animation
  const handleGotoChat = () => {
    startTransition(() => {
      const path = `/chat`;
      navigate(path);
    })
  };


  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
              <Button onClick={handleGotoChat}>
                <tr>
                  <td>
                    <Image key={item.name} className="logo" src={item.src} alt={item.alt} />
                  </td>
                  <td>{item.name}</td>
                </tr>
              </Button>
            </div>
          ))}
        </table>
        <div className={`floating-container ${isMenuOpen ? 'menu-open' : ''}`}>
          <button className="floating-button" onClick={toggleMenu}>{<AddRegular />}</button>
          <div className="floating-icons">
            <button className="icon-button">
              <HomeRegular />
            </button>
            <button className="icon-button">
              <SettingsRegular />
            </button>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

export default Dashboard;
