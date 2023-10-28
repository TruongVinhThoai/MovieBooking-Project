import React from "react";
import Slider from "./Slider/Slider";
import ListMovie from "./ListMovie/ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Search from "../../components/Search";
import Tintuc from "./TinTuc/TinTuc";
import UngDung from "./UngDung/UngDung";

export default function Home() {
  return (
    <div>
      <Slider />
      <Search />
      <ListMovie />
      <TabMovie />
      <Tintuc />
      <UngDung />
    </div>
  );
}
