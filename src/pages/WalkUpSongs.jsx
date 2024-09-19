import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const WalkUpSongs = () => {
  const songs = [
    {
      title: "Enter Sandman",
      artist: "Metallica",
      year: 1991,
      description: "Made famous by New York Yankees closer Mariano Rivera, this heavy metal classic creates an intense atmosphere as the player enters the game. The song's ominous intro and powerful guitar riffs signal that it's time for batters to say their prayers.",
      youtubeEmbed: "CD-E-LDc384"
    },
    {
      title: "Welcome to the Jungle",
      artist: "Guns N' Roses",
      year: 1987,
      description: "This high-energy rock anthem, with its wild guitar intro and Axl Rose's signature scream, perfectly captures the fierce competition of professional sports. It's been used by numerous players to pump themselves up and intimidate opponents.",
      youtubeEmbed: "o1tj2zJ2Wvg"
    },
    {
      title: "Thunderstruck",
      artist: "AC/DC",
      year: 1990,
      description: "The building tension in the intro of \"Thunderstruck\" creates a perfect atmosphere of anticipation as a player approaches. The explosive chorus that follows can electrify both the player and the crowd.",
      youtubeEmbed: "v2AC41dglnM"
    },
    {
      title: "All I Do Is Win",
      artist: "DJ Khaled ft. T-Pain, Ludacris, Snoop Dogg & Rick Ross",
      year: 2010,
      description: "This upbeat hip-hop track exudes confidence and success, making it a popular choice for players looking to make a statement. Its catchy chorus and boastful lyrics can boost a player's morale as they step up to the plate.",
      youtubeEmbed: "GGXzlRoNtHU"
    },
    {
      title: "Seven Nation Army",
      artist: "The White Stripes",
      year: 2003,
      description: "The instantly recognizable guitar riff of this song has become a staple at sporting events worldwide. Its simplicity makes it easy for crowds to chant along, creating an intimidating atmosphere for opposing teams.",
      youtubeEmbed: "0J2QdDbelmY"
    },
    {
      title: "Crazy Train",
      artist: "Ozzy Osbourne",
      year: 1980,
      description: "The iconic opening of \"Crazy Train\" with its memorable guitar riff and Ozzy's maniacal laugh creates an electric atmosphere. It's been a popular choice for players looking to energize themselves and the crowd.",
      youtubeEmbed: "tMDFv5m18Pw"
    },
    {
      title: "The Final Countdown",
      artist: "Europe",
      year: 1986,
      description: "This '80s classic, with its dramatic synthesizer intro, builds a sense of anticipation perfect for crucial moments in the game. It's been used by players to signify that it's time to step up and deliver.",
      youtubeEmbed: "9jK-NcRmVcw"
    },
    {
      title: "Gonna Fly Now (Theme from Rocky)",
      artist: "Bill Conti",
      year: 1976,
      description: "The triumphant horns and inspiring melody of the Rocky theme song can make any player feel like an underdog ready to overcome the odds. It's a great choice for players looking to channel their inner champion.",
      youtubeEmbed: "ioE_O7Lm0I4"
    },
    {
      title: "Lose Yourself",
      artist: "Eminem",
      year: 2002,
      description: "The intense beat and motivational lyrics of this Eminem classic make it a perfect walk-up song for players needing to focus and seize their moment. Its message of giving your all resonates with the competitive spirit of baseball.",
      youtubeEmbed: "xFYQQPAOz7Y"
    },
    {
      title: "Kashmir",
      artist: "Led Zeppelin",
      year: 1975,
      description: "Closing our top 10 is this epic Led Zeppelin track. Its mystical, building intro and powerful instrumentation create a sense of gravitas as a player approaches, signaling that something important is about to happen.",
      youtubeEmbed: "PD-MdiUm1_Y"
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
          <h1 className="text-4xl font-bold mb-4">Top 10 Best Walk-Up Songs in Baseball</h1>
          <p className="text-xl mb-8">
            Walk-up songs have become integral to baseball culture, serving as a player's anthem as they approach the plate or mound. These songs not only pump up the player but also energize the crowd and add to the game's overall atmosphere. A great walk-up song can intimidate opponents, inspire teammates, and create memorable moments for fans. Here are the top 10 best walk-up songs of all time, showcasing tracks that have become iconic in the world of baseball and beyond.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} by {song.artist} ({song.year})
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

export default WalkUpSongs;