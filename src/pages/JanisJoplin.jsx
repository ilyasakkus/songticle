import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const JanisJoplin = () => {
  const songs = [
    {
      title: "Piece of My Heart",
      year: 1968,
      description: "Joplin's rendition of \"Piece of My Heart\" became her breakthrough hit and signature song. Her raspy, emotionally charged vocals transform this soul tune into a raw, rock anthem. Joplin's ability to convey pain, defiance, and vulnerability in a single performance is on full display, making this track a defining moment in rock history.",
      youtubeEmbed: "SCngPse1iiI"
    },
    {
      title: "Me and Bobby McGee",
      year: 1971,
      description: "Released posthumously, this Kris Kristofferson-penned song became Joplin's only number-one hit on the Billboard Hot 100. Her soulful interpretation, building from a gentle country-folk ballad to a full-throated rock finale, showcases her versatility as a vocalist. The bittersweet timing of its release has cemented its place as one of Joplin's most beloved songs.",
      youtubeEmbed: "5Cg-j0X09Ag"
    },
    {
      title: "Ball and Chain",
      year: 1968,
      description: "Joplin's live performance of \"Ball and Chain\" at the Monterey Pop Festival in 1967 catapulted her to stardom. Her gut-wrenching delivery and the extended, improvisational nature of the performance demonstrate why Joplin was considered one of the most captivating live performers of her era. This blues standard became a cornerstone of Joplin's repertoire.",
      youtubeEmbed: "gCB2eDF3jBM"
    },
    {
      title: "Cry Baby",
      year: 1971,
      description: "Joplin's cover of this Garnet Mimms song showcases her ability to infuse R&B material with rock energy. Her explosive vocals and the song's dynamic arrangement create an emotionally charged experience. \"Cry Baby\" exemplifies Joplin's talent for taking existing songs and making them entirely her own.",
      youtubeEmbed: "VfGSd-tikH4"
    },
    {
      title: "Summertime",
      year: 1968,
      description: "Joplin's psychedelic-blues take on this Gershwin classic from \"Porgy and Bess\" demonstrates her innovative approach to interpreting standards. Her haunting, ethereal vocals contrast with moments of raw power, creating a unique and unforgettable version of this much-covered song.",
      youtubeEmbed: "A24JZkgvNv4"
    },
    {
      title: "Try (Just a Little Bit Harder)",
      year: 1969,
      description: "This energetic track from Joplin's first solo album showcases her ability to deliver high-energy rock performances. Her passionate vocals and the song's driving rhythm create an anthem of determination and perseverance. \"Try\" demonstrates Joplin's transition from band member to solo artist.",
      youtubeEmbed: "jjHw_FJySg4"
    },
    {
      title: "Down on Me",
      year: 1967,
      description: "One of Joplin's earliest recordings with Big Brother and the Holding Company, \"Down on Me\" is a traditional song reworked into a psychedelic blues-rock number. Joplin's powerful vocals shine through the band's raw, garage-rock sound, hinting at the star power that would soon make her famous.",
      youtubeEmbed: "Uzfxy6AaZNc"
    },
    {
      title: "Mercedes Benz",
      year: 1971,
      description: "This a cappella song, one of the last Joplin recorded before her death, showcases her wit and social commentary. Its simple, blues-inspired melody allows Joplin's voice to take center stage. The song's ironic humor and Joplin's unaccompanied performance make it a unique entry in her catalogue.",
      youtubeEmbed: "-H7YULkiLIA"
    },
    {
      title: "Kozmic Blues",
      year: 1969,
      description: "From her first solo album, \"Kozmic Blues\" demonstrates Joplin's growth as an artist. The song's introspective lyrics and Joplin's soulful delivery create a deeply personal and moving performance. This track shows Joplin's ability to blend blues, soul, and rock into her own unique style.",
      youtubeEmbed: "vuoE95Dme8k"
    },
    {
      title: "Get It While You Can",
      year: 1971,
      description: "Closing our top 10 is this soulful track from Joplin's final album. Her passionate vocals and the song's message of living life to the fullest take on added poignancy in light of her untimely death. \"Get It While You Can\" serves as a fitting epitaph for Joplin's brief but impactful career.",
      youtubeEmbed: "mtj9w2gYzV4"
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
          <h1 className="text-4xl font-bold mb-4">Janis Joplin</h1>
          <p className="text-xl mb-8">
            Janis Lyn Joplin, born on January 19, 1943, in Port Arthur, Texas, was one of the most iconic and influential rock singers of the 1960s. Known for her powerful, bluesy vocals and electric stage presence, Joplin broke new ground for women in rock music. Her raw, emotional performances and distinctive voice set her apart from her contemporaries. Despite her tragically short career, cut short by her untimely death in 1970 at the age of 27, Joplin left an indelible mark on the music world.
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

export default JanisJoplin;