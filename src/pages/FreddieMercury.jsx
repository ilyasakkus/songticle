import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const FreddieMercury = () => {
  const songs = [
    {
      title: "Bohemian Rhapsody",
      year: 1975,
      description: "Often hailed as Mercury's masterpiece, this six-minute epic defies conventional song structure, blending rock with operatic passages. Mercury's tour-de-force vocal performance and the song's innovative production have made it one of the most beloved and influential songs in rock history.",
      youtubeEmbed: "fJ9rUzIMcZQ"
    },
    {
      title: "Somebody to Love",
      year: 1976,
      description: "This gospel-inspired rock ballad showcases Mercury's incredible vocal range and emotional depth. The song's powerful crescendos and Mercury's impassioned delivery create a stirring anthem of loneliness and hope.",
      youtubeEmbed: "kijpcUv-b8M"
    },
    {
      title: "Don't Stop Me Now",
      year: 1978,
      description: "One of Queen's most upbeat and energetic tracks, this song perfectly captures Mercury's exuberant personality. Its catchy piano riff, Mercury's dynamic vocals, and lyrics celebrating life and freedom have made it an enduring feel-good classic.",
      youtubeEmbed: "HgzGwKwLmgM"
    },
    {
      title: "We Are the Champions",
      year: 1977,
      description: "This anthemic stadium rock classic has become synonymous with victory celebrations worldwide. Mercury's triumphant vocals and the song's uplifting message create a timeless ode to perseverance and success.",
      youtubeEmbed: "04854XqcfCY"
    },
    {
      title: "Love of My Life",
      year: 1975,
      description: "This beautiful ballad, written by Mercury for his long-time partner Mary Austin, showcases his more tender side. The song's delicate piano arrangement and Mercury's heartfelt vocals create a deeply moving expression of love and devotion.",
      youtubeEmbed: "sUJkCXE4sAA"
    },
    {
      title: "Crazy Little Thing Called Love",
      year: 1979,
      description: "Mercury's tribute to Elvis Presley, this rockabilly-inspired track demonstrates his versatility as a songwriter and performer. Its catchy rhythm, simple lyrics, and Mercury's playful vocals create an irresistible homage to 1950s rock and roll.",
      youtubeEmbed: "zO6D_BAuYCI"
    },
    {
      title: "The Show Must Go On",
      year: 1991,
      description: "Recorded near the end of Mercury's life, this powerful ballad serves as a testament to his dedication to his art. The song's defiant lyrics and Mercury's resolute vocal performance, despite his failing health, create a poignant and inspiring farewell.",
      youtubeEmbed: "t99KH0TR-J4"
    },
    {
      title: "Barcelona",
      year: 1987,
      description: "This duet with opera singer Montserrat Caballé showcases Mercury's love for opera and his ability to blend genres. The song's grandiose production and the stunning vocal interplay between Mercury and Caballé create a unique and unforgettable listening experience.",
      youtubeEmbed: "Y1fiOJDXA-E"
    },
    {
      title: "I Want to Break Free",
      year: 1984,
      description: "This synth-pop influenced track, accompanied by its iconic music video, became one of Queen's most recognizable hits of the 1980s. Mercury's emotive vocals and the song's theme of personal liberation resonate with listeners across generations.",
      youtubeEmbed: "f4Mc-NYPHaQ"
    },
    {
      title: "Living on My Own",
      year: 1985,
      description: "Closing our top 10 is this solo track from Mercury's Mr. Bad Guy album. Its disco-inspired beat, Mercury's energetic vocals, and the song's theme of independence showcase his ability to create compelling music outside of Queen.",
      youtubeEmbed: "DedaEVIbTkY"
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
          <h1 className="text-4xl font-bold mb-4">Freddie Mercury</h1>
          <p className="text-xl mb-8">
            Farrokh Bulsara, known professionally as Freddie Mercury, was born on September 5, 1946, in Stone Town, Zanzibar. As the lead vocalist and pianist of Queen, Mercury became one of the most iconic and influential figures in rock music history. Known for his powerful four-octave vocal range, flamboyant stage presence, and innovative songwriting, Mercury helped redefine the boundaries of rock music. His ability to blend genres, from rock and pop to opera and funk, created a unique sound that continues to captivate audiences worldwide.
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

export default FreddieMercury;