import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const RoyOrbison = () => {
  const songs = [
    {
      title: "Oh, Pretty Woman",
      year: 1964,
      description: "Arguably Orbison's most famous song, \"Oh, Pretty Woman\" is instantly recognizable from its opening guitar riff. The song's playful lyrics, Orbison's powerful vocals, and the driving rhythm created a worldwide hit. Its enduring popularity and memorable hook have made it a rock and roll classic.",
      youtubeEmbed: "3KFvoDDs0XM"
    },
    {
      title: "Crying",
      year: 1961,
      description: "\"Crying\" showcases Orbison's incredible vocal range and emotional depth. The song builds from a quiet, vulnerable beginning to a powerful, heartbreaking climax. Orbison's ability to convey raw emotion through his voice is on full display, making this one of the most poignant ballads in rock history.",
      youtubeEmbed: "EA2m1B4-R7k"
    },
    {
      title: "In Dreams",
      year: 1963,
      description: "With its unconventional structure and dreamlike quality, \"In Dreams\" is a testament to Orbison's innovative songwriting. His soaring vocals and the song's surreal narrative create a hauntingly beautiful experience. Its use in David Lynch's film \"Blue Velvet\" introduced it to a new generation of listeners.",
      youtubeEmbed: "pqdLKtxApHw"
    },
    {
      title: "Only the Lonely",
      year: 1960,
      description: "This song marked Orbison's breakthrough as a solo artist. Its lush orchestration and Orbison's emotive delivery set the template for his signature ballad style. The song's theme of isolation and heartbreak, coupled with Orbison's powerful vocals, created a new kind of vulnerability in rock music.",
      youtubeEmbed: "YcuNs9_Vg8s"
    },
    {
      title: "You Got It",
      year: 1989,
      description: "Part of Orbison's remarkable late-career renaissance, \"You Got It\" proved he could create contemporary hits decades after his initial success. Co-written with Jeff Lynne and Tom Petty, the song's upbeat melody and Orbison's still-powerful voice made it a worldwide hit, sadly released just after his death.",
      youtubeEmbed: "TYQzIw0zat0"
    },
    {
      title: "Running Scared",
      year: 1961,
      description: "This unique ballad showcases Orbison's operatic approach to rock music. The song's building tension, lack of chorus, and dramatic climax create a miniature musical drama. Orbison's vocal performance, culminating in an impressive high note, demonstrates his unparalleled range and control.",
      youtubeEmbed: "oC58DYAYCdY"
    },
    {
      title: "Blue Bayou",
      year: 1963,
      description: "While later popularized by Linda Ronstadt, Orbison's original version of \"Blue Bayou\" is a masterpiece of melancholy and longing. His smooth, effortless vocals and the song's gentle, swaying rhythm create a wistful, dreamy atmosphere that perfectly captures the feeling of homesickness.",
      youtubeEmbed: "x94ejEQzVYE"
    },
    {
      title: "Dream Baby (How Long Must I Dream)",
      year: 1962,
      description: "This upbeat track showcases a more rhythmic, pop-oriented side of Orbison's repertoire. His distinctive vocals and the song's catchy chorus created another major hit. \"Dream Baby\" demonstrates Orbison's versatility, proving he could excel at up-tempo numbers as well as ballads.",
      youtubeEmbed: "_NxlyXUVCPU"
    },
    {
      title: "It's Over",
      year: 1964,
      description: "Another example of Orbison's flair for dramatic, emotionally charged ballads, \"It's Over\" features his soaring vocals over a lush orchestral arrangement. The song's sense of finality and Orbison's heart-wrenching delivery create a powerful ode to lost love.",
      youtubeEmbed: "-Jm3Tq_q4yU"
    },
    {
      title: "Handle With Care",
      year: 1988,
      description: "While not a solo Orbison song, this Traveling Wilburys track deserves inclusion for its role in Orbison's late-career resurgence. His distinctive voice blends beautifully with those of his supergroup bandmates (George Harrison, Bob Dylan, Tom Petty, and Jeff Lynne), creating a joyous, life-affirming song that showcases Orbison's enduring talent.",
      youtubeEmbed: "qL_MjRnPiQo"
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
          <h1 className="text-4xl font-bold mb-4">Roy Orbison</h1>
          <p className="text-xl mb-8">
            Roy Kelton Orbison, born on April 23, 1936, in Vernon, Texas, was one of the most distinctive and influential voices in popular music. Known for his powerful, impassioned vocals, complex song structures, and dark emotional ballads, Orbison stood out in the rock and roll era of the 1950s and 60s. His three-octave vocal range and vulnerable, often operatic style earned him the nicknames "the Caruso of Rock" and "the Big O." Despite facing personal tragedies, Orbison's career spanned four decades, including a remarkable comeback in the 1980s.
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

export default RoyOrbison;