import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const SabrinaCarpenter = () => {
  const songs = [
    {
      title: "Skin",
      year: 2021,
      description: "This emotionally charged ballad showcases Carpenter's mature songwriting and vocal prowess. Its candid lyrics and powerful delivery demonstrate her ability to address personal experiences through her music.",
      youtubeEmbed: "CA9E4HHHbRk"
    },
    {
      title: "Why",
      year: 2017,
      description: "\"Why\" marked a significant step in Carpenter's musical evolution. Its catchy chorus and relatable lyrics about romantic uncertainty resonated with fans and critics alike, becoming one of her signature songs.",
      youtubeEmbed: "4qeaBFFq3to"
    },
    {
      title: "Thumbs",
      year: 2016,
      description: "This upbeat pop anthem with its infectious hook and empowering message became one of Carpenter's breakthrough hits. The song's clever wordplay and Carpenter's confident delivery make it a fan favorite.",
      youtubeEmbed: "uAVUl0cAKpo"
    },
    {
      title: "Sue Me",
      year: 2018,
      description: "\"Sue Me\" showcases Carpenter's sassy side with its bold lyrics and catchy melody. The song's blend of pop and R&B elements highlights her versatility as an artist.",
      youtubeEmbed: "7w4Udbys4O4"
    },
    {
      title: "On My Way",
      year: 2019,
      description: "This collaboration with Alan Walker and Farruko demonstrated Carpenter's ability to excel in the EDM-pop genre. Its uplifting message and danceable beat made it a global hit.",
      youtubeEmbed: "dhYOPzcsbGM"
    },
    {
      title: "Almost Love",
      year: 2018,
      description: "With its pulsing beat and sultry vocals, \"Almost Love\" represents Carpenter's transition to a more mature sound. The song's infectious chorus and dynamic production make it a standout in her discography.",
      youtubeEmbed: "JudqK1hL18w"
    },
    {
      title: "In My Bed",
      year: 2019,
      description: "This introspective pop song addresses themes of anxiety and overthinking. Carpenter's vulnerable lyrics and the song's dreamy production create a relatable and atmospheric track.",
      youtubeEmbed: "FN3bTP84GCU"
    },
    {
      title: "Alien",
      year: 2018,
      description: "This EDM-pop collaboration showcases Carpenter's vocals in a different light. The song's catchy hook and dance-oriented production expanded her musical horizons.",
      youtubeEmbed: "4ughEPQGd8w"
    },
    {
      title: "Smoke and Fire",
      year: 2016,
      description: "One of Carpenter's earlier hits, \"Smoke and Fire\" demonstrates her ability to convey complex emotions through her music. The song's powerful vocals and emotive lyrics hint at the artistic growth to come.",
      youtubeEmbed: "ZlH78Tm_oUk"
    },
    {
      title: "Let Me Move You",
      year: 2021,
      description: "Closing our top 10 is this upbeat track from the Netflix film \"Work It.\" Its energetic production and Carpenter's dynamic vocals create a feel-good dance anthem that showcases her continued evolution as an artist.",
      youtubeEmbed: "26QlQQglWl0"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Sabrina Carpenter</h1>
          <p className="text-xl mb-8">
            Sabrina Carpenter, born on May 11, 1999, in Lehigh Valley, Pennsylvania, has quickly become one of the most promising young pop stars of her generation. Rising to fame through her role as Maya Hart in the Disney Channel series "Girl Meets World," Carpenter has since established herself as a talented singer-songwriter with a distinctive voice and relatable lyrics. Her music blends pop with elements of R&B and electronic dance music, appealing to a wide audience.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                <div className="aspect-w-16 aspect-h-9" style={{ height: '480px' }}>
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

export default SabrinaCarpenter;