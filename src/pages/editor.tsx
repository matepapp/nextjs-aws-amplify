import { Heading } from "@chakra-ui/core";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("../components/ckeditor-wrapper"), {
  ssr: false
});

const EditorPage: NextPage = () => {
  return (
    <>
      <Heading>CKEditor</Heading>
      <CKEditor data="Some default stuff" />
    </>
  );
};

export default EditorPage;
