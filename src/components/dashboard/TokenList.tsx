import React from "react";
import { TokenKingCard } from "components/dashboard/TokenKingCard";
import TokenCard from "components/common/TokenCard";
import SearchForm from "components/common/SearchForm";
import SelectForm from "components/common/SelectForm";

interface Token {
  tokenImg: string;
  tokenName: string;
  tokenDescription: string;
  progress: string;
}

interface Props {
  selectOptions1: { value: string; label: string }[];
  selectOptions2: { value: string; label: string }[];
  selectedOption1: string;
  selectedOption2: string;
  handleSearch: (value: string) => void;
  handleSelectChange: (value: string) => void;
  filteredTokens: Token[];
  onTokenClick: (token: Token) => void;
}

const HomeView: React.FC<Props> = ({
  selectOptions1,
  selectOptions2,
  selectedOption1,
  selectedOption2,
  handleSearch,
  handleSelectChange,
  filteredTokens,
  onTokenClick,
}) => {
  const handleClick = (token: Token) => {
    onTokenClick(token);
  };

  return (
    <div className="pt-[32px]">
      <div className="m-auto flex w-[183px] items-center justify-center rounded-[10px] bg-[#9945FF] p-1 text-lg text-white">
        Create token
      </div>
      <h1 className="py-[23px] text-center text-[40px] font-bold text-white">
        King of the hill
      </h1>
      <TokenKingCard />
      <div className="justify-center gap-[23px] pb-[38px] pt-[49px] lg:flex">
        <SearchForm
          onSearch={handleSearch}
          placeholder="Search token"
          containerClassName="lg:w-fit lg:m-0 m-auto"
          inputClassName="2xl:w-[520px]"
        />
        <div className="flex items-center justify-center gap-[23px] pt-4 lg:pt-0">
          <SelectForm
            options={selectOptions1}
            value={selectedOption1}
            onChange={handleSelectChange}
            selectClassName=""
            wrapperClassName="w-full"
          />
          <SelectForm
            options={selectOptions2}
            value={selectedOption2}
            onChange={handleSelectChange}
            selectClassName=""
            wrapperClassName="w-full"
          />
        </div>
      </div>
      <div className="flex-wrap lg:flex">
        {filteredTokens.map((token, i) => (
          <div
            key={i}
            onClick={() => handleClick(token)}
            className="m-auto w-fit py-[5px] md:px-[14px] md:py-[10px] lg:w-1/2 xl:w-1/3 xl:px-[19px] xl:py-[13px]"
          >
            <TokenCard tokenCardValues={token} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
