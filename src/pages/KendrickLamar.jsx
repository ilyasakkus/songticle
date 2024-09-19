import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const KendrickLamar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Kendrick Lamar</h1>
          <p className="text-xl mb-8">
            Kendrick Lamar Duckworth, born on June 17, 1987, in Compton, California, is widely regarded as one of the most influential and critically acclaimed rappers of his generation. Known for his intricate wordplay, storytelling ability, and socially conscious lyrics, Lamar has pushed the boundaries of hip-hop and redefined what it means to be a modern rap artist.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {[
              {
                title: "Alright",
                year: 2015,
                description: "This powerful anthem from 'To Pimp a Butterfly' became a rallying cry for the Black Lives Matter movement.",
                youtubeEmbed: "Z-48u_uWMHY"
              },
              {
                title: "HUMBLE.",
                year: 2017,
                description: "With its hard-hitting beat and memorable hook, 'HUMBLE.' showcases Lamar's ability to create chart-topping hits without compromising his artistic integrity.",
                youtubeEmbed: "tvTRZJ-4EyI"
              },
              {
                title: "m.A.A.d city",
                year: 2012,
                description: "This epic track from 'good kid, m.A.A.d city' demonstrates Lamar's storytelling prowess.",
                youtubeEmbed: "KKCSwOVudMo"
              },
              {
                title: "Swimming Pools (Drank)",
                year: 2012,
                description: "While often misinterpreted as a party anthem, this song is a nuanced exploration of alcohol abuse.",
                youtubeEmbed: "B5YNiCfWC3A"
              },
              {
                title: "DNA.",
                year: 2017,
                description: "This high-energy track showcases Lamar's technical skill as a rapper.",
                youtubeEmbed: "NLZRYQMLDW4"
              },
              {
                title: "King Kunta",
                year: 2015,
                description: "With its funk-influenced beat and confident lyrics, 'King Kunta' is a celebration of African American culture and a critique of the music industry.",
                youtubeEmbed: "hRK7PVJFbS8"
              },
              {
                title: "The Blacker the Berry",
                year: 2015,
                description: "This hard-hitting song addresses racial tensions and internalized racism.",
                youtubeEmbed: "Qhd8aWMcAfw"
              },
              {
                title: "Bitch, Don't Kill My Vibe",
                year: 2012,
                description: "This laid-back track showcases Lamar's smoother side.",
                youtubeEmbed: "GF8aaTu2kg0"
              },
              {
                title: "i",
                year: 2014,
                description: "This uplifting, Grammy-winning single promotes self-love and positivity.",
                youtubeEmbed: "8aShfolR6w8"
              },
              {
                title: "u",
                year: 2015,
                description: "Closing our top 10 is this emotionally raw track from 'To Pimp a Butterfly'.",
                youtubeEmbed: "XGC4QpDIpJc"
              }
            ].map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${song.youtubeEmbed}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KendrickLamar;