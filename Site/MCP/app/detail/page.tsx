import React, { useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import HeaderBar from "../components/home/headerBar";
import BreadcrumbBar from "../components/detail/breadcrumbBar";
import RepoCard from "../components/base/RepoCard";
import RepoCardDetail from "../components/detail/RepoCardDetail";
import { useRouter } from "next/router";
import prisma from "@/prisma/prisma";
import { GetServerSideProps } from "next";
import FooterBar from "../components/home/footerBar";
import Related from "../components/detail/related";

const RepoDetail = () => {
  return (
    <div className="sm:px-32 md:px-80 flex flex-col justify-center items-center">
      <HeaderBar></HeaderBar>
      <BreadcrumbBar></BreadcrumbBar>
      <RepoCardDetail ></RepoCardDetail>
      <Related></Related>

      <FooterBar></FooterBar>

      {/* <RepoCardDetail repo={repo} repoDetail={repoDetail}></RepoCardDetail> */}
    </div>
  );
};

export default RepoDetail;
