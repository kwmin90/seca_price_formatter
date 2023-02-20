import React, { useState } from "react";
import { EPP } from "@/types/types";

interface CheckboxProps {
  epp: EPP[];
  setSites: React.Dispatch<React.SetStateAction<String[]>>;
}
export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const { epp, setSites } = props;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<Array<String>>([]);

  const handleCheckAll = (epp: EPP[]) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(epp.map((item) => item.name));
    setSites(epp.map((item) => item.name));
    if (isCheckAll) {
      setIsCheck([]);
      setSites([]);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    setSites([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setSites(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <div className="grid">
      <div className="grid-item">
        <input
          type="checkbox"
          onChange={() => handleCheckAll(epp)}
          checked={isCheckAll}
        />
        <label>Select All</label>
      </div>
      {epp.map((item) => (
        <div key={item.name} className="grid-item">
          <input
            type="checkbox"
            id={item.name}
            onChange={(e) => handleCheck(e)}
            checked={isCheck.includes(item.name)}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};
