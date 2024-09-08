import Image from "next/image";
import scss from "./Loading.module.scss";
import { FC } from "react";
import loading from "../../../assets/spotify.loading.gif"

const PreLoader: FC = () => {
  return (
    <div className={scss.loader}>
      <Image src={loading} alt="image" />
    </div>
  );
};

export default PreLoader;
