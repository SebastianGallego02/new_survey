import React, { useEffect, useState } from "react";
import Hero from "./hero";
import PartnersLogos from "./partners";
import NewsCarousel from "./newsCarousel";
import BasicCalendar from "../components/ui/calendar/calendar";
import { GridBoard } from "../components/ui/grid/grid";
import CarouselPhotos from "../components/ui/carousel/photos/carouselPhotos";
import Categories from "../components/ui/categories/categories";
import { BarChart } from "../components/ui/charts/chart";
import { Area } from "../components/ui/charts/area";
import { ScatterGraph } from "../components/ui/charts/scatter";
import Post from "../components/ui/panel/imageTextPanel";
import Blog from "../blog/blog";
import Navbar from "../header/navbar";


export default function HomeIndex() {

  return (
    <>
      <Navbar />
      <Hero />
      <div className="mx-auto max-w-9/10">
        <PartnersLogos />
        <NewsCarousel />
        <BasicCalendar />
        <GridBoard />
        <Blog />
        <CarouselPhotos />
        <Categories />
        <BarChart />
        <Area />
        <ScatterGraph />
        <Post />
      </div>
    </>
  );
}
