import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const GloRilla = () => {
  const songs = [
    {
      title: "Put It On Da Floor",
      year: 2023,
      description: "GloRilla's long-awaited remix of Latto's hit single, \"Put It On Da Floor,\" has arrived, and it's nothing short of spectacular. Released on June 22, the accompanying music video showcases the Memphis rapper completely owning her element. Dressed lavishly in an array of jewels, GloRilla exudes confidence and charisma as she spits fiery bars over the scorching beat, masterfully produced by Go Grizzly, Squat Beats, and Ben Hogarth.",
      youtubeEmbed: "PJad_xgPstk"
    },
    {
      title: "Tomorrow 2",
      year: 2022,
      description: "\"Tomorrow 2\" is a dynamic and groundbreaking collaboration between American rapper GloRilla and the iconic Cardi B, released on September 23, 2022, under Interscope Records & CMG The Label. This remix of GloRilla's original track \"Tomorrow\" takes the song to a whole new level, combining the raw energy and lyricism of both artists. Penned by the two rappers themselves, along with Macaroni Toni and Pardison Fontaine, the song showcases their undeniable chemistry and mutual admiration for each other's talents.",
      youtubeEmbed: "zwa7NzNBQig"
    },
    {
      title: "Tomorrow",
      year: 2022,
      description: "\"Tomorrow\" is a captivating and impactful song by American rapper GloRilla, released on July 15, 2022. As part of Collective Music Group's compilation album, Gangsta Art (2022), the track quickly caught the attention of music enthusiasts with its powerful and thought-provoking lyrics. GloRilla, along with co-writer Antonio Anderson Jr, crafts a compelling narrative that touches on themes of resilience, determination, and the pursuit of success in the face of adversity.",
      youtubeEmbed: "F466pARgiHs"
    },
    {
      title: "Lick Or Sum",
      year: 2023,
      description: "\"GloRilla - Lick Or Sum\" is a sensational hip-hop track that made waves upon its release in 2023. As an artist known for her direct and powerful style, GloRilla once again demonstrates her lyrical prowess and magnetic presence in this song. With an infectious beat and captivating flow, \"Lick Or Sum\" hooks listeners from the very first note.",
      youtubeEmbed: "iUS3zXs9tPc"
    },
    {
      title: "Ex's",
      year: 2023,
      description: "GloRilla's latest single, \"Exs (Phatnall Remix),\" is a true gem in the world of hip-hop music. With his distinct artistry and undeniable talent, the American rapper proves once again why he stands out in the industry. As the second track on his highly anticipated 13-track project, \"Anyways, Life's Great…Bonus Edition,\" this song delivers an electrifying experience that listeners won't forget.",
      youtubeEmbed: "EEwJQ5M8f5Q"
    },
    {
      title: "Nut Quick",
      year: 2022,
      description: "In \"Nut Quick,\" GloRilla showcases her unapologetic and bold style as a rapper. The track's straightforwardness is one of her greatest strengths, and she doesn't hold back on this hard-hitting song. Over a simple yet pounding beat, GloRilla delivers sharp and assertive verses that leave no room for interpretation. With fierce confidence, she proclaims herself as a raw and unstoppable force, dismissing any notion that she can be easily dealt with.",
      youtubeEmbed: "uOQw0dX0fao"
    },
    {
      title: "No More Love",
      year: 2022,
      description: "\"No More Love\" is a poignant and emotionally charged song featured on GloRilla's EP, \"Anyways, Life's Great...\" The track delves into the complexities of love and relationships, exploring the pain of heartbreak and the struggle to move forward. With collaborations from esteemed artists like Cardi B, Yo Gotti, Niki Pooh, and HitKidd, the EP itself has garnered widespread acclaim, catapulting it to the impressive No. 11 spot on the Billboard 200 chart.",
      youtubeEmbed: "9UaumheebMg"
    },
    {
      title: "Blessed",
      year: 2022,
      description: "\"Blessed\" is a captivating hip-hop song performed by American rapper GloRilla, which was officially released on August 31, 2022. It serves as the second single from her debut EP titled \"Anyways, Life's Great,\" released in the same year. The track boasts powerful verses and an infectious chorus that reflect GloRilla's journey from adversity to triumph.",
      youtubeEmbed: "HhYKFpHBt98"
    },
    {
      title: "Westside Baby (Gutta)",
      year: 2021,
      description: "In 2021, GloRilla gifted the world with an electrifying track titled \"Westside Baby (Gutta),\" a song that pulsates with raw energy and street-smart authenticity. From the moment the beat drops, listeners are transported to the heart of the Westside, immersing themselves in the artist's vivid storytelling and magnetic presence.",
      youtubeEmbed: "OHwNCBKK9WY"
    },
    {
      title: "Internet Trolls",
      year: 2023,
      description: "GloRilla's newest track, \"Internet Trolls\" hits hard with its message, reminding listeners that there's more to life than the virtual realm. Produced by the talented Hitkidd, known for his Grammy-nominated work, the song's captivating blend of musical elements enhances its powerful narrative. In the official video, directed by the visionary Troy Roscoe, GloRilla visually portrays the destructive impact of internet trolls, urging us to break free from digital toxicity.",
      youtubeEmbed: "RmxF264KyIs"
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
          <h1 className="text-4xl font-bold mb-4">GloRilla</h1>
          <p className="text-xl mb-8">
            GloRilla, the enigmatic band that has left an indelible mark on the music scene, has gifted us with countless unforgettable songs over the years. From their early days as underground sensations to their meteoric rise to international acclaim, GloRilla's discography is a testament to their extraordinary talent and sonic innovation. Their tracks have not only resonated deeply with fans but have also become cultural touchstones, inspiring generations with their powerful lyrics, infectious melodies, and genre-defying arrangements.
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

export default GloRilla;