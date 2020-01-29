import { Heading } from "@chakra-ui/core";
import { NextPage } from "next";

type Props = {
  data: string;
};

const PostsPage: NextPage<Props> = ({ data }) => {
  console.log({ data });
  return <Heading>Posts</Heading>;
};

PostsPage.getInitialProps = async () => {
  return { data: "Hello" };
};

export default PostsPage;
