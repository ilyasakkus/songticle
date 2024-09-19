import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const WhitneyHouston = () => {
  const songs = [
    {
      title: "I Will Always Love You",
      year: 1992,
      description: "This powerhouse ballad, originally written by Dolly Parton, became Houston's signature song. Her soaring vocals, especially in the a cappella introduction, and the song's emotional delivery created an iconic performance that remains one of the best-selling singles of all time.",
      youtubeEmbed: "mK4hweZRU0k"
    },
    {
      title: "I Wanna Dance with Somebody (Who Loves Me)",
      year: 1987,
      description: "This upbeat pop hit showcases Houston's ability to deliver both fun and vocal prowess. Its catchy chorus, energetic production, and Houston's vibrant performance make it an enduring feel-good classic that continues to fill dance floors.",
      youtubeEmbed: "XSzmOKg1WIY"
    },
    {
      title: "The Greatest Love of All",
      year: 1985,
      description: "This inspirational ballad became one of Houston's most beloved songs. Her powerful, emotive delivery and the song's uplifting message about self-love and personal strength resonate deeply with listeners across generations.",
      youtubeEmbed: "IlxazfYx81w"
    },
    {
      title: "Saving All My Love for You",
      year: 1985,
      description: "Houston's first number-one hit on the Billboard Hot 100 showcases her incredible vocal control and emotional depth. The jazz-influenced ballad's sophisticated arrangement and Houston's nuanced performance established her as a vocal powerhouse.",
      youtubeEmbed: "TFtm9eQfoaM"
    },
    {
      title: "How Will I Know",
      year: 1985,
      description: "This infectious dance-pop hit demonstrates Houston's versatility as an artist. Its upbeat tempo, catchy hooks, and Houston's energetic vocals create a perfect blend of pop sensibility and R&B influence that defined the mid-80s sound.",
      youtubeEmbed: "m3-hY-hlhBg"
    },
    {
      title: "I Have Nothing",
      year: 1992,
      description: "From \"The Bodyguard\" soundtrack, this dramatic ballad showcases Houston's vocal range and emotional intensity. The song's powerful crescendos and Houston's impassioned delivery create a tour-de-force performance that highlights her unparalleled vocal abilities.",
      youtubeEmbed: "FxYw0XPEoKE"
    },
    {
      title: "Didn't We Almost Have It All",
      year: 1987,
      description: "This passionate power ballad allows Houston to display her vocal dynamics, from tender moments to soaring high notes. The song's emotional lyrics and Houston's heartfelt performance create a poignant exploration of lost love.",
      youtubeEmbed: "c0TghfreFok"
    },
    {
      title: "Where Do Broken Hearts Go",
      year: 1988,
      description: "This soulful ballad became Houston's seventh consecutive number-one hit, a record at the time. Her emotive vocals and the song's relatable lyrics about heartbreak and hope showcase her ability to connect with listeners on a deeply personal level.",
      youtubeEmbed: "wa3tfVjGCQ8"
    },
    {
      title: "I'm Every Woman",
      year: 1992,
      description: "Houston's cover of Chaka Khan's hit infuses the disco classic with her signature vocal power. Her energetic performance and the song's empowering message create an anthem of female strength and unity that transcends generations.",
      youtubeEmbed: "H7_sqdkaAfo"
    },
    {
      title: "Run to You",
      year: 1992,
      description: "Closing our top 10 is another gem from \"The Bodyguard\" soundtrack. This tender ballad showcases Houston's ability to convey vulnerability and strength simultaneously. Her controlled yet emotional delivery creates a beautiful, intimate performance that highlights her vocal mastery.",
      youtubeEmbed: "h9rCobRl-ng"
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
          <h1 className="text-4xl font-bold mb-4">Whitney Houston</h1>
          <p className="text-xl mb-8">
            Whitney Elizabeth Houston, born on August 9, 1963, in Newark, New Jersey, was one of the most celebrated and influential singers of all time. Known as "The Voice," Houston possessed a powerful, soulful soprano that set new standards in popular music. Her ability to blend pop, R&B, and gospel influences created a unique sound that dominated the charts for nearly three decades. With numerous awards, including six Grammys, and over 200 million records sold worldwide, Houston left an indelible mark on the music industry.
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

export default WhitneyHouston;