import { CreateToken } from "components/CreateToken";
import { FC } from "react";

export const CreateView: FC = ({}) => {
  return (
    <div className="p-4 md:p-8 xl:p-14 h-full bg-black">
        {/* CONTENT GOES HERE */}
        <div>
          <CreateToken />
        </div> 
    </div>
  );
};
