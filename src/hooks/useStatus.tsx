import { useEffect, useState } from "react";

type Props = {
  status: string;
};

const useStatus = ({ status }: Props) => {
  const [statusLabel, setStatusLabel] = useState<string>("");
  const handleChangeStatus = () => {
    if (status === "approved") {
      setStatusLabel("Diterima");
    } else {
      setStatusLabel("Ditolak");
    }
  };

  useEffect(() => {
    handleChangeStatus();
  }, [status]);

  return { statusLabel };
};

export default useStatus;
