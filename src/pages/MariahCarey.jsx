import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const MariahCarey = () => {
  const songs = [
    {
      title: "Vision of Love",
      year: 1990,
      description: "Carey's debut single introduced her incredible vocal range to the world. Its powerful vocals, emotional delivery, and a blend of pop and R&B set the stage for her career and influenced a generation of singers. This song remains a defining moment in 90s pop music.",
      youtubeEmbed: "ZYITIvS27I0"
    },
    {
      title: "Hero",
      year: 1993,
      description: "This inspirational ballad became one of Carey's signature songs. Its uplifting lyrics and Carey's emotive performance create a timeless anthem of self-belief and inner strength that continues to resonate with listeners worldwide.",
      youtubeEmbed: "0IA3ZvCkRkQ"
    },
    {
      title: "Fantasy",
      year: 1995,
      description: "This upbeat pop hit, sampling Tom Tom Club's \"Genius of Love,\" showcases Carey's ability to blend pop with hip-hop influences. The song's catchy melody, Carey's playful vocals, and its innovative remix featuring Ol' Dirty Bastard marked a new direction in her music.",
      youtubeEmbed: "qq09UkPRdFY"
    },
    {
      title: "We Belong Together",
      year: 2005,
      description: "This R&B ballad dominated the charts upon its release and was often considered Carey's comeback single. Its heartfelt lyrics, Carey's restrained yet emotional delivery, and the song's modern production cemented her status as a timeless artist.",
      youtubeEmbed: "0habxsuXW4g"
    },
    {
      title: "Always Be My Baby",
      year: 1995,
      description: "This sweet, melodic love song has become one of Carey's most enduring hits. Its catchy chorus, Carey's effortless vocals, and the song's nostalgic feel create a perfect pop confection that appeals to listeners of all ages.",
      youtubeEmbed: "LfRNRymrv9k"
    },
    {
      title: "One Sweet Day",
      year: 1995,
      description: "This collaboration with Boyz II Men held the record for the longest-running number-one single on the Billboard Hot 100 for 23 years. The song's poignant lyrics about loss and hope, combined with the stellar vocal performances, create a deeply moving experience.",
      youtubeEmbed: "UXxRyNvTPr8"
    },
    {
      title: "Emotions",
      year: 1991,
      description: "This uptempo track showcases Carey's incredible vocal acrobatics, including her famous whistle register. The song's disco influences and joyful energy make it a fan favorite and a testament to Carey's vocal prowess.",
      youtubeEmbed: "NrJEFrth27Q"
    },
    {
      title: "All I Want for Christmas Is You",
      year: 1994,
      description: "This modern Christmas classic has become one of the most popular holiday songs of all time. Its upbeat tempo, festive lyrics, and Carey's cheerful performance have made it a seasonal staple that continues to top charts every December.",
      youtubeEmbed: "aAkMkVFwAoo"
    },
    {
      title: "Dreamlover",
      year: 1993,
      description: "This breezy, feel-good pop song demonstrates Carey's ability to craft irresistible summer hits. Its sample of The Emotions' \"Blind Alley\" and Carey's effortless vocals create a perfect blend of retro and contemporary pop.",
      youtubeEmbed: "CqBtS6BIP1E"
    },
    {
      title: "Touch My Body",
      year: 2008,
      description: "Closing our top 10 is this playful, flirtatious track that became Carey's 18th number-one hit, breaking Elvis Presley's record for most number-one singles by a solo artist. The song's clever lyrics and Carey's sultry delivery showcase her ability to evolve with changing musical trends.",
      youtubeEmbed: "9b8erWuBA44"
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
          <h1 className="text-4xl font-bold mb-4">Mariah Carey</h1>
          <p className="text-xl mb-8">
            Mariah Carey, born on March 27, 1969, in Huntington, New York, is one of the most successful and influential pop divas of all time. Known for her five-octave vocal range, whistle register, and melismatic singing style, Carey has been a dominant force in the music industry since her debut in 1990. With numerous number-one hits, Grammy Awards, and record-breaking achievements, Carey has established herself as the "Songbird Supreme." Her ability to blend pop, R&B, and hip-hop, coupled with her songwriting prowess, has resulted in a catalog of timeless hits.
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

export default MariahCarey;