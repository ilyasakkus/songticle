import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const GreatestJazzSongs = () => {
  const songs = [
    {
      title: "Take Five",
      artist: "Dave Brubeck",
      year: 1959,
      description: "This iconic track, with its distinctive 5/4 time signature, became one of the best-selling jazz singles of all time. Its catchy piano vamp and memorable saxophone melody make it instantly recognizable.",
      youtubeEmbed: "tT9Eh8wNMkw"
    },
    {
      title: "So What",
      artist: "Miles Davis",
      year: 1959,
      description: "The opening track from the legendary album \"Kind of Blue,\" \"So What\" is a masterpiece of modal jazz. Its cool, relaxed atmosphere and innovative harmonic structure influenced countless musicians.",
      youtubeEmbed: "zqNTltOGh5c"
    },
    {
      title: "A Love Supreme, Pt. 1 - Acknowledgement",
      artist: "John Coltrane",
      year: 1965,
      description: "This spiritual jazz masterpiece showcases Coltrane's intense, searching style. Its hypnotic four-note bass motif and Coltrane's impassioned saxophone create a transcendent musical experience.",
      youtubeEmbed: "5Pi5ZJZ07ME"
    },
    {
      title: "Sing, Sing, Sing",
      artist: "Benny Goodman",
      year: 1937,
      description: "This big band classic, with its driving drum rhythms and clarinet solos, epitomizes the swing era. Its infectious energy makes it impossible to sit still.",
      youtubeEmbed: "3mJ4dpNal_k"
    },
    {
      title: "Strange Fruit",
      artist: "Billie Holiday",
      year: 1939,
      description: "A powerful protest song against racism, \"Strange Fruit\" showcases Holiday's emotive vocals and demonstrates jazz's ability to address serious social issues.",
      youtubeEmbed: "wHGAMjwr_j8"
    },
    {
      title: "Take the 'A' Train",
      artist: "Duke Ellington",
      year: 1941,
      description: "This swinging big band number became Ellington's signature tune. Its memorable melody and sophisticated arrangement exemplify the elegance of Ellington's style.",
      youtubeEmbed: "aG4Tte6XGkA"
    },
    {
      title: "Round Midnight",
      artist: "Thelonious Monk",
      year: 1944,
      description: "One of the most recorded jazz standards, this haunting ballad showcases Monk's unique harmonic approach and has inspired countless interpretations.",
      youtubeEmbed: "JJ5D9oyv6vw"
    },
    {
      title: "My Favorite Things",
      artist: "John Coltrane",
      year: 1961,
      description: "Coltrane's transformation of this Rodgers and Hammerstein show tune into a modal jazz exploration demonstrates jazz's ability to reinvent familiar melodies.",
      youtubeEmbed: "qWG2dsXV5HI"
    },
    {
      title: "Summertime",
      artist: "Ella Fitzgerald and Louis Armstrong",
      year: 1957,
      description: "This duet version of the Gershwin classic showcases two of jazz's greatest voices in a beautifully relaxed, swinging performance.",
      youtubeEmbed: "OdueU1NnbiU"
    },
    {
      title: "West End Blues",
      artist: "Louis Armstrong",
      year: 1928,
      description: "Armstrong's legendary trumpet introduction and scat singing on this track revolutionized jazz improvisation and set new standards for technical virtuosity.",
      youtubeEmbed: "4WPCBieSESI"
    },
    {
      title: "In a Sentimental Mood",
      artist: "Duke Ellington and John Coltrane",
      year: 1963,
      description: "This collaboration between two jazz giants resulted in a sublimely beautiful rendition of Ellington's classic ballad.",
      youtubeEmbed: "sCQfTNOC5aE"
    },
    {
      title: "Birdland",
      artist: "Weather Report",
      year: 1977,
      description: "A fusion jazz classic, \"Birdland\" combines jazz improvisation with funk rhythms and electronic textures, showcasing jazz's adaptability to new sounds.",
      youtubeEmbed: "vz7nMBLUnDc"
    },
    {
      title: "Goodbye Pork Pie Hat",
      artist: "Charles Mingus",
      year: 1959,
      description: "Mingus's elegy for saxophonist Lester Young is a masterpiece of emotion and compositional sophistication.",
      youtubeEmbed: "CWWO_VcdnHY"
    },
    {
      title: "Cantaloupe Island",
      artist: "Herbie Hancock",
      year: 1964,
      description: "This groovy, accessible tune has become a jazz standard, known for its catchy piano riff and relaxed, funky feel.",
      youtubeEmbed: "8B1oIXGX0Io"
    },
    {
      title: "Autumn Leaves",
      artist: "Cannonball Adderley and Miles Davis",
      year: 1958,
      description: "This rendition of the popular standard showcases the interplay between Adderley's alto sax and Davis's trumpet, backed by a stellar rhythm section.",
      youtubeEmbed: "tguu4m38U78"
    },
    {
      title: "The Girl from Ipanema",
      artist: "Stan Getz and Astrud Gilberto",
      year: 1964,
      description: "This bossa nova classic brought Brazilian rhythms to a global audience, featuring Gilberto's cool vocals and Getz's smooth saxophone.",
      youtubeEmbed: "sVdaFQhS86E"
    },
    {
      title: "Chameleon",
      artist: "Herbie Hancock",
      year: 1973,
      description: "Another fusion classic, \"Chameleon\" combines jazz improvisation with funk grooves, showcasing Hancock's innovative use of synthesizers.",
      youtubeEmbed: "iqomTAiRnVM"
    },
    {
      title: "Stolen Moments",
      artist: "Oliver Nelson",
      year: 1961,
      description: "This medium-tempo swing tune has become a jazz standard, known for its memorable melody and sophisticated harmonies.",
      youtubeEmbed: "RbaGDDbpcQ4"
    },
    {
      title: "Naima",
      artist: "John Coltrane",
      year: 1959,
      description: "One of Coltrane's most beautiful compositions, \"Naima\" is a tender ballad that showcases his more lyrical side.",
      youtubeEmbed: "bPAC6zt_1ZM"
    },
    {
      title: "Blue in Green",
      artist: "Miles Davis",
      year: 1959,
      description: "Closing our top 20 is this hauntingly beautiful ballad from \"Kind of Blue,\" featuring Davis's muted trumpet and Bill Evans's impressionistic piano.",
      youtubeEmbed: "TLDflhhdPCg"
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
          <h1 className="text-4xl font-bold mb-4">The Greatest Jazz Songs of All Time</h1>
          <p className="text-xl mb-8">
            Jazz, with its rich history and diverse styles, has produced countless memorable compositions over the past century. From swinging big band tunes to cool jazz ballads and avant-garde experimentations, jazz has continuously evolved while maintaining its core elements of improvisation and musical dialogue. Here are the top 20 greatest jazz songs of all time, showcasing the breadth and depth of this uniquely American art form.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 20 Songs</h2>
          <div className="space-y-8">
            {songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. "{song.title}" by {song.artist} ({song.year})
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

export default GreatestJazzSongs;