import PopularDaysContainer from "@/containers/PopularDaysContainer";
import PopularPostsContainer from "@/containers/PopularPostsContainer";

export default function PopularPosts() {
  return (
    <>
      <PopularDaysContainer />
      <PopularPostsContainer day={"20250407" as string} />
    </>
  );
}
