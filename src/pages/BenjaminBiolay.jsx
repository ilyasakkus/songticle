import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const BenjaminBiolay = () => {
  const songs = [
    {
      title: "Comment est ta peine ?",
      year: 2020,
      description: "Released in 2020, \"Comment est ta peine?\" is a poignant musical creation that delves into the complexities of human emotion. This track encapsulates Biolay's introspective prowess, intertwining raw vulnerability with a melodic embrace. The song's title, translating to \"How's Your Pain?\", sets the tone for an exploration of empathy and connection, as Biolay's evocative vocals glide over a mesmerizing arrangement.",
      youtubeEmbed: "Ba7TB4QXzmU"
    },
    {
      title: "Comme une voiture volée",
      year: 2021,
      description: "\"Comme une voiture volée\" emerges as the second single from Benjamin Biolay's album \"Grand Prix,\" released in June 2021. With its enigmatic title translating to \"Like a Stolen Car,\" this pop-rock track unveils Biolay's contemporary artistry, merging his penchant for poetic storytelling with a vibrant musical backdrop.",
      youtubeEmbed: "SROemLeWwL4"
    },
    {
      title: "Miss Miss",
      year: 2016,
      description: "Released in 2016, \"Miss Miss\" is a captivating musical composition that showcases Biolay's versatility and genre-defying prowess. This track captures Biolay's foray into a more rock-oriented sound while maintaining his signature poetic lyricism.",
      youtubeEmbed: "W0vCddpZ3WI"
    },
    {
      title: "Parc fermé",
      year: 2020,
      description: "In 2020, Benjamin Biolay and Adé collaborated to release \"Parc fermé,\" a musical fusion that exemplifies their combined creative brilliance. This track showcases Biolay's distinctive style intertwined with Adé's artistic flair, resulting in a captivating melody that defies genre boundaries.",
      youtubeEmbed: "Q7HhEhxAtt8"
    },
    {
      title: "Rends l'amour !",
      year: 2022,
      description: "Released in 2022, \"Rends l'amour!\" is a musical gem that continues to showcase Biolay's mastery of crafting captivating melodies and poignant storytelling. The song captures Biolay's unique ability to blend vulnerability and strength within his musical expression.",
      youtubeEmbed: "ml_-qHzhtQA"
    },
    {
      title: "Volver",
      year: 2017,
      description: "\"Volver,\" the resounding eighth album by Benjamin Biolay, emerged on May 19, 2017. Serving as the second chapter of his preceding masterpiece \"Palermo Hollywood,\" this album stands as a testament to Biolay's unceasing creative evolution.",
      youtubeEmbed: "PhlPLDAJ_ao"
    },
    {
      title: "La Superbe",
      year: 2009,
      description: "Released in 2009, \"La Superbe\" is a musical marvel that embodies Biolay's artistic essence. A tapestry of introspection and innovation, this title track encapsulates Biolay's mastery in blending poetic lyricism with evocative melodies.",
      youtubeEmbed: "CtEWzf6Lbkk"
    },
    {
      title: "Aime mon amour",
      year: 2012,
      description: "In 2012, Benjamin Biolay unveiled the ethereal ballad \"Aime mon amour,\" a song that stands as a testament to his prowess in crafting delicate melodies that resonate deeply within the hearts of listeners. With a whispering vulnerability in his voice, Biolay navigates the tender terrain of love.",
      youtubeEmbed: "dj7Lfoil1-I"
    },
    {
      title: "Roma (amoR)",
      year: 2017,
      description: "In 2017, Benjamin Biolay joined forces with Illya Kuryaki and the Valderramas to create \"Roma.\" This collaborative gem transcends the mere realm of a song, unfolding as an auditory tapestry that transports listeners to a realm of rhythmic euphoria.",
      youtubeEmbed: "jB5pKRgX9No"
    },
    {
      title: "Ne regrette rien",
      year: 2012,
      description: "In 2012, Benjamin Biolay unveiled his pop masterpiece \"Ne regrette rien,\" a mesmerizing tapestry of sonic textures that effortlessly encapsulates the zeitgeist of the era. With his signature finesse, Biolay's velvety vocals cascade through a lush arrangement, seamlessly intertwining with a hypnotic melody.",
      youtubeEmbed: "gpc-9Cs-aA8"
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
          <h1 className="text-4xl font-bold mb-4">Benjamin Biolay</h1>
          <p className="text-xl mb-8">
            Benjamin Biolay, the versatile French virtuoso, has crafted an exceptional musical legacy characterized by his gentle vocals, poetic songwriting, and adept production skills. Drawing comparisons to iconic pop star Étienne Daho, Biolay's influence extends far and wide. His collaborations have left an indelible mark, including co-writing and producing for his sister Coralie Clément's albums, contributing to Henri Salvador's triumphant return with "Chambre avec Vue," and working with French music legends like Françoise Hardy and Vanessa Paradis. Biolay's sonic journey spans introspective melodies to avant-garde compositions, a range evident in his extensive discography.
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

export default BenjaminBiolay;