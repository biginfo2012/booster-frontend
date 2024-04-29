import React, { FC ,useState, useEffect } from "react";
import Head from "next/head";
import { HomeView } from "../views";


const Home: FC<any> = ({ tokenCardValues }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedOption1, setSelectedOption1] = useState("bumporder");
  const [selectedOption2, setSelectedOption2] = useState("desc");
  const [selectedOption3, setSelectedOption3] = useState("Yesterday");
  const [filteredTokens, setFilteredTokens] = useState(tokenCardValues);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToken, setSelectedToken] = useState<any>(null);

  const selectOptions1 = [
    { value: "bumporder", label: "bump order" },
    { value: "lastreply", label: "last reply" },
    { value: "reply count", label: "reply count" },
    { value: "market cap", label: "market cap" },
    { value: "creation time", label: "creation time" },
  ];

  const selectOptions2 = [
    { value: "asc", label: "asc" },
    { value: "desc", label: "desc" },
  ];

  const selectOptions3 = [
    { value: "Yesterday", label: "Yesterday" },
    { value: "Last Week", label: "Last Week" },
  ];

  useEffect(() => {
    filterTokens(searchTerm, selectedOption2);
  }, [searchTerm, selectedOption2]);

  const handleSelectChange = (value: string) => {
    setSelectedOption1(value);
    setSelectedOption2(value);
    setSelectedOption3(value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filterTokens = (searchTerm: string, sortingOption: string) => {
    let filtered = [...tokenCardValues];

    if (searchTerm) {
      filtered = filtered.filter((token) =>
        token.tokenName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortingOption === "asc") {
      filtered.sort((a, b) => parseFloat(a.progress) - parseFloat(b.progress));
    } else if (sortingOption === "desc") {
      filtered.sort((a, b) => parseFloat(b.progress) - parseFloat(a.progress));
    }

    setFilteredTokens(filtered);
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleTokenClick = (token: any) => {
    setSelectedToken(token);
    setActivePage("tokenDetail");
  };

  return (
    <div className="relative">
      <div className="relative lg:fixed">
        {/* Render your sidebar component here */}
      </div>
      <div className={`px-4 md:px-8 xl:px-14 bg-black min-h-screen transition-all duration-500 z-20 relative `}>
        {/* Render your navbar component here */}
        {activePage === "dashboard" && (
          <HomeView
            selectOptions1={selectOptions1}
            selectOptions2={selectOptions2}
            selectedOption1={selectedOption1}
            selectedOption2={selectedOption2}
            handleSearch={handleSearch}
            handleSelectChange={handleSelectChange}
            filteredTokens={filteredTokens}
            onTokenClick={handleTokenClick}
          />
        )}
        {/* Render other pages/components based on the activePage state */}
      </div>
    </div>
  );
};

export default Home;
