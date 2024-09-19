import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const Live = () => {
  const songs = [
    {
      title: "I Been Livin",
      year: 2020,
      description: "\"I Been Livin\" is a soul-stirring and introspective musical creation by the exceptionally talented artist Liv.e. Falling under the R&B and neo-soul genres, the song showcases Liv.e's remarkable ability to infuse her music with raw emotion and authenticity. With her captivating vocals and poetic lyricism, Liv.e takes listeners on a heartfelt journey of self-discovery and growth.",
      youtubeEmbed: "7F3AB7QoQhY"
    },
    {
      title: "LazyEaterBetsOnHerLikeness",
      year: 2020,
      description: "\"LazyEaterBetsOnHerLikeness\" is an entrancing and innovative musical piece by the multi-talented artist Liv.e. Combining elements of lo-fi hip-hop, R&B, and experimental sounds, the song stands as a testament to Liv.e's boundary-pushing artistry. With its laid-back yet mesmerizing vibe, the track weaves a hypnotic spell, drawing listeners into a dreamlike world of enchanting melodies and evocative storytelling. The title \"LazyEaterBetsOnHerLikeness\" hints at themes of self-assurance and self-exploration, as Liv.e eloquently reflects on her identity and place in the world. The song's subtle and intricate production provides the perfect backdrop for Liv.e's soulful vocals, creating a captivating and immersive listening experience. \"LazyEaterBetsOnHerLikeness\" is a true showcase of Liv.e's artistry and her ability to craft music that not only resonates with the soul but also challenges the boundaries of traditional genres.",
      youtubeEmbed: "_i4n2f8LriQ"
    },
    {
      title: "SirLadyMakemFall",
      year: 2020,
      description: "\"SirLadyMakemFall\" is a captivating and genre-defying musical creation by the exceptionally talented artist Liv.e. Falling under the neo-soul and experimental R&B genres, the song showcases Liv.e's remarkable ability to push the boundaries of contemporary music. With a unique blend of soulful melodies, innovative production, and thought-provoking lyrics, Liv.e crafts a mesmerizing sonic journey that leaves a lasting impression.",
      youtubeEmbed: "PysAZ10mXwQ"
    },
    {
      title: "BoutThesePipedreams / LessonsFromMyMistakes...but I Lost Your Number",
      year: 2020,
      description: "\"BoutThesePipedreams / LessonsFromMyMistakes\" is a soul-stirring and introspective musical fusion by the exceptionally talented artist Liv.e. Combining elements of soul, lo-fi hip-hop, and R&B, this captivating song takes listeners on a poignant and emotive journey of self-reflection and growth. Liv.e's soothing and evocative vocals serve as a conduit for the heartfelt and thought-provoking lyrics that delve into the trials and triumphs of life's experiences.",
      youtubeEmbed: "PU1TBlrsXXI"
    },
    {
      title: "You the One Fish in the Sea",
      year: 2020,
      description: "\"You the One Fish in the Sea\" is a soulful and enchanting musical gem brought to life by the extraordinary artist Liv.e. Falling under the neo-soul and experimental R&B genres, the song showcases Liv.e's unique ability to blend emotive melodies with innovative production. With her mesmerizing vocals and poetic storytelling, Liv.e takes listeners on a journey through the depths of love and self-discovery.",
      youtubeEmbed: "Aix6fwZLtOc"
    },
    {
      title: "Wild Animals",
      year: 2020,
      description: "\"Wild Animals\" is a mesmerizing musical composition by the exceptionally talented artist Liv.e. Falling under the neo-soul and experimental R&B genres, the song showcases Liv.e's artistic versatility and ability to craft emotive and captivating melodies. With her soulful and velvety vocals, Liv.e weaves a hypnotic narrative that draws listeners into a world of raw emotions and introspection.",
      youtubeEmbed: "JUd9E08qoRM"
    },
    {
      title: "HowTheyLikeMe!",
      year: 2020,
      description: "\"HowTheyLikeMe\" is a genre-blending masterpiece crafted by the incredibly talented artist Liv.e. This captivating song seamlessly merges elements of experimental R&B and alternative hip-hop, pushing the boundaries of contemporary music. Liv.e's distinctive voice takes center stage as she delivers mesmerizing verses over an innovative and dynamic production. The track's infectious beats and hypnotic melodies create an immersive sonic experience that defies convention and invites listeners to explore uncharted musical territories.",
      youtubeEmbed: "dZG49WUdLu8"
    },
    {
      title: "Ghost",
      year: 2020,
      description: "\"Ghost\" is a soul-stirring musical creation brought to life by the supremely talented artist Liv.e. This captivating song falls under the R&B and soul genres, weaving together a spellbinding tapestry of emotions and sonic brilliance. Liv.e's velvety vocals effortlessly glide over a backdrop of evocative instrumentals, drawing listeners into a hauntingly beautiful realm. The song's poignant lyrics delve into themes of love, loss, and the lingering presence of memories, evoking a sense of ethereal nostalgia. As \"Ghost\" unfolds, its entrancing melodies and heartfelt delivery resonate deeply with listeners, making it a powerful and emotive musical experience that lingers in the heart and mind long after the last note fades away.",
      youtubeEmbed: "O5z8HMsANaI"
    },
    {
      title: "I Been Livin",
      year: 2020,
      description: "\"I Been Livin\" is a soulful and introspective musical gem brought to life by the talented artist Liv.e. Infused with elements of R&B, soul, and jazz, the song carries a smooth and laid-back vibe that instantly captivates listeners. Liv.e's velvety vocals beautifully intertwine with the gentle instrumentation, creating an intimate and immersive sonic experience. Through heartfelt and evocative lyrics, \"I Been Livin\" explores themes of self-discovery, growth, and the passage of time. The song's soothing melodies and thoughtful composition allow listeners to reflect on their own journey, making it an emotive and relatable piece of art. Whether it's to unwind after a long day or to get lost in contemplation, \"I Been Livin\" serves as the perfect soundtrack for moments of introspection and connection.",
      youtubeEmbed: "FvZ8aboeadE"
    },
    {
      title: "7OCOTD",
      year: 2020,
      description: "\"7OCOTD\" is a captivating musical masterpiece by the talented artist Liv.e. This mesmerizing track seamlessly blends elements of R&B, soul, and hip-hop, creating a unique and entrancing sonic experience. With a dreamy atmosphere and hypnotic beats, \"7OCOTD\" showcases Liv.e's enchanting vocals as she weaves evocative lyrics that delve into emotions and introspection. The song's title, an acronym for \"7 O'clock on the Dot,\"  hints at a moment of clarity or reflection, drawing listeners into a soulful journey of self-discovery. Through dusty loops and sun-soaked production, Liv.e invites us to immerse ourselves in her world, where time seems to stand still, and emotions intertwine effortlessly with the rhythm. \"7OCOTD\" is a must-listen for music enthusiasts seeking an unforgettable melodic experience that pushes the boundaries of contemporary genres.",
      youtubeEmbed: "aYK0oWZ5Skk"
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
          <h1 className="text-4xl font-bold mb-4">Liv.e</h1>
          <p className="text-xl mb-8">
            Liv.e, hailing from Dallas, Texas, is an enigmatic singer-songwriter, rapper, and producer who has emerged as a visionary force in the music industry. Known for her ingenious blend of R&B, jazz, soul, and hip-hop, Liv.e has redefined the boundaries of genre with her ethereal melodies and soul-stirring lyrics. Her unique voice and ability to craft evocative narratives have captivated audiences and critics alike, establishing her as an unparalleled musical talent in contemporary music.
          </p>
          <p className="text-xl mb-8">
            With a voice that weaves a spellbinding spell and an unrivaled ability to craft evocative narratives, Liv.e's musical prowess is unparalleled. Her artistry seamlessly blends elements of neo-soul, experimental R&B, and alternative hip-hop, creating a sonic landscape that is both innovative and deeply emotive. From the hypnotic beats of tracks like "7OCOTD" to the introspective depths of "I Been Livin," Liv.e's music invites listeners on a journey of self-discovery and emotional exploration.
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

export default Live;