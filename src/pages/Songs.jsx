import SongScraper from "@/components/SongScraper";

const Songs = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Popular Songs</h1>
      <SongScraper />
    </div>
  );
};

export default Songs;
