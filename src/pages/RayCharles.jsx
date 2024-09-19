import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const RayCharles = () => {
  const songs = [
    {
      title: "Georgia On My Mind",
      year: 1960,
      description: "Although not written by Charles, his soulful rendition of this Hoagy Carmichael classic became his signature song. Charles's emotional delivery and the lush orchestral arrangement create a timeless ode to home. This Grammy-winning performance led to the song becoming the official state song of Georgia.",
      youtubeEmbed: "B6fQ9L0BwU8"
    },
    {
      title: "Hit the Road Jack",
      year: 1961,
      description: "This upbeat, call-and-response duet with Margie Hendricks showcases Charles's playful side. The catchy melody, driving rhythm, and Charles's dynamic vocals made it an instant classic. \"Hit the Road Jack\" demonstrates Charles's ability to blend R&B with pop sensibilities.",
      youtubeEmbed: "uSiHqxgE2d0"
    },
    {
      title: "What'd I Say",
      year: 1959,
      description: "Often considered one of the first soul songs, \"What'd I Say\" features Charles's electrifying piano work and call-and-response vocals. The song's infectious groove and suggestive lyrics were groundbreaking for its time, helping to usher in a new era of popular music.",
      youtubeEmbed: "EPLZL4s_jtI"
    },
    {
      title: "I Can't Stop Loving You",
      year: 1962,
      description: "This country song, reimagined by Charles with lush orchestration and soulful vocals, became one of his biggest hits. It showcases Charles's ability to transcend genre boundaries, bringing country music to a wider audience and paving the way for his groundbreaking \"Modern Sounds in Country and Western Music\" album.",
      youtubeEmbed: "kT9rZYvu8Q0"
    },
    {
      title: "Unchain My Heart",
      year: 1961,
      description: "Charles's rendition of this Bobby Sharp song became the definitive version. His passionate vocals and the song's bluesy arrangement create a powerful plea for freedom from a toxic relationship. \"Unchain My Heart\" exemplifies Charles's ability to infuse deep emotion into his performances.",
      youtubeEmbed: "1XG-pkXulA4"
    },
    {
      title: "I've Got a Woman",
      year: 1954,
      description: "One of Charles's earliest hits, \"I've Got a Woman\" is considered a landmark in the development of soul music. The song's gospel-influenced call-and-response structure, combined with Charles's energetic piano playing and passionate vocals, helped define his signature style.",
      youtubeEmbed: "j6l-qQMOs9c"
    },
    {
      title: "You Don't Know Me",
      year: 1962,
      description: "This melancholic ballad showcases Charles's ability to convey deep emotion through his voice. His subtle, nuanced delivery perfectly captures the song's themes of unrequited love. Charles's version of this country standard became a definitive recording, appreciated across genre lines.",
      youtubeEmbed: "jyTiyHI8g4s"
    },
    {
      title: "America the Beautiful",
      year: 1972,
      description: "Charles's soulful, gospel-tinged rendition of \"America the Beautiful\" became an iconic version of the patriotic standard. His emotive delivery and the gradual build-up of the arrangement create a powerful, moving performance that has been used in numerous significant national events.",
      youtubeEmbed: "2FXN1Z6Q004"
    },
    {
      title: "Mess Around",
      year: 1953,
      description: "One of Charles's early compositions, \"Mess Around\" showcases his boogie-woogie piano skills and energetic vocals. The song's upbeat tempo and playful lyrics demonstrate Charles's ability to get people onto the dance floor. It remains a beloved example of early rock and roll.",
      youtubeEmbed: "l5X9O_svM_0"
    },
    {
      title: "Here We Go Again",
      year: 1967,
      description: "Closing our top 10 is this country-soul ballad that became one of Charles's signature songs. His smooth, emotional delivery and the song's gentle melody create a poignant reflection on a tumultuous relationship. \"Here We Go Again\" showcases Charles's mature artistry and his continued ability to blend country and soul.",
      youtubeEmbed: "oRpSzngnBtc"
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
          <h1 className="text-4xl font-bold mb-4">Ray Charles</h1>
          <p className="text-xl mb-8">
            Ray Charles Robinson, born on September 23, 1930, in Albany, Georgia, was a pioneering musician who helped shape the sound of rhythm and blues and brought it into mainstream pop music. Nicknamed "The Genius," Charles was known for his soulful voice, masterful piano playing, and his ability to blend genres including gospel, blues, jazz, and country. Despite losing his sight at a young age, Charles became one of the most influential and successful musicians of the 20th century. His innovative style laid the groundwork for soul music and influenced countless artists across various genres.
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

export default RayCharles;