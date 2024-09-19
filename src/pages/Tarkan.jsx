import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const Tarkan = () => {
  const songs = [
    {
      title: "Dudu",
      year: 2003,
      description: "\"Dudu\" is a captivating song by Turkish pop sensation Tarkan, released in 2003 as part of his extended play (EP) of the same name. This track played a significant role in solidifying Tarkan's status as a global music icon and marked his successful transition into the international music scene. The title \"Dudu\" doesn't have a direct translation in English but is often used as an endearing term, similar to \"sweetie\" or \"darling.\" The song's lyrics are infused with romantic and passionate sentiments, and Tarkan's charismatic vocals convey a sense of love and longing that resonates deeply with listeners.",
      youtubeEmbed: "SCZgGVqVsbY"
    },
    {
      title: "Kedi Gibi",
      year: 2017,
      description: "\"Kedi Gibi\" is a captivating and romantic song by Turkish pop sensation Tarkan, released in 2017 as part of his album titled \"10.\" This track is a beautiful testament to Tarkan's ability to convey love and sensuality through his music. Tarkan's charismatic vocals, with a touch of sensuality, create an intimate atmosphere that draws listeners into a world of passion and longing.",
      youtubeEmbed: "X0rg-O2SDPA"
    },
    {
      title: "Kuzu Kuzu",
      year: 2001,
      description: "\"Kuzu Kuzu\" is a delightful and infectious song by the Turkish pop sensation Tarkan, released in 2001 as part of his album titled \"Karma.\" This track is one of Tarkan's most iconic songs, celebrated for its catchy melody, upbeat rhythm, and the artist's signature blend of traditional Turkish and modern pop elements. The title \"Kuzu Kuzu\" translates to \"Lamb, Lamb\" in English, and the song's lyrics convey a playful and flirtatious message.",
      youtubeEmbed: "NAHRpEqgcL4"
    },
    {
      title: "Yolla",
      year: 2017,
      description: "\"Yolla\" is a hit song by Turkish pop sensation Tarkan, released in 2017. This track is part of his album titled \"10,\" which marked his return to the music scene after a hiatus of nearly seven years since his previous studio album. \"Yolla\" is a vibrant and catchy song that combines Tarkan's distinctive pop style with elements of Turkish music. The title \"Yolla\" can be translated to \"Send\" or \"Go,\" and the song's lyrics revolve around themes of love, longing, and the desire to reconnect with a past love.",
      youtubeEmbed: "_GOZDXq7I-I"
    },
    {
      title: "Öp",
      year: 2010,
      description: "\"Öp\" song was released in 2010 Tarkan's Album \"Adımı Kalbine Yaz\". It was a hit song when it was released in Turkey Pop Music. The title \"Öp\" translates to \"Kiss\" in English, and the song's lyrics and melody combine to create a passionate and romantic atmosphere that has resonated with fans for decades. With \"Öp,\" Tarkan showcases his ability to convey deep emotions through music.",
      youtubeEmbed: "QNoC_mVojhc"
    },
    {
      title: "Ölürüm Sana",
      year: 1997,
      description: "\"Ölürüm Sana\" is a landmark album by Turkish pop sensation Tarkan, released in 1997. The title, which translates to \"I'd Die for You\" in English, not only encapsulates the album's themes of love and passion but also foreshadows the tremendous impact it would have on both Turkish and international music scenes. The album \"Ölürüm Sana\" marked a significant turning point in Tarkan's career, solidifying his status as a major pop icon in Turkey and beyond.",
      youtubeEmbed: "LJ9FpMXJmwY"
    },
    {
      title: "Şımarık",
      year: 1998,
      description: "\"Şımarık\" is an iconic and infectious song by Turkish pop sensation Tarkan, which catapulted him to international stardom when it was released in 1998 as part of his album \"Ölürüm Sana.\" This track is not only one of Tarkan's signature songs but also a testament to his ability to blend traditional Turkish musical elements with contemporary pop, creating a sound that captivated audiences around the world.",
      youtubeEmbed: "cpp69ghR1IM"
    },
    {
      title: "Bir Oluruz Yolunda",
      year: 2001,
      description: "The title \"Bir Oluruz Yolunda\" translates to \"We Become One on Your Path,\" and the song's lyrics reflect themes of love, devotion, and unity. It was released in 2001. Tarkan's soulful and tender vocals convey a sense of longing and passion, making it a perfect track for romantic moments or introspective contemplation. The song's instrumentation is a beautiful blend of traditional Turkish musical elements and contemporary pop sensibilities, creating a rich and evocative musical backdrop for the poignant lyrics.",
      youtubeEmbed: "EBwjmeDoE6A"
    },
    {
      title: "Hüp",
      year: 2001,
      description: "\"Hüp\" is an exhilarating and captivating song from Tarkan's 2001 album, \"Karma,\" which played a pivotal role in cementing his status as a global music sensation. This track is a shining example of Tarkan's ability to seamlessly blend traditional Turkish sounds with contemporary pop, creating a mesmerizing sonic experience that transcends borders. The word \"Hüp\" itself is an onomatopoeic expression that mirrors the playful and infectious energy of the song.",
      youtubeEmbed: "4tLOG4us6zc"
    },
    {
      title: "Bounce",
      year: 2006,
      description: "\"Bounce\" is a dynamic and infectious dance anthem that showcases Tarkan's prowess as a global pop sensation. Released in 2006 as one of the lead singles from his first English-language album, \"Come Closer,\" the song instantly became a club and radio favorite, solidifying Tarkan's presence in the European music scene.",
      youtubeEmbed: "vAxn-wnulWE"
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
          <h1 className="text-4xl font-bold mb-4">Tarkan</h1>
          <p className="text-xl mb-8">
            Tarkan, the Turkish music sensation, has undeniably left an indelible mark on the global music scene with his irresistible blend of pop, dance, and traditional Turkish sounds. With a career spanning over three decades, Tarkan's discography boasts an array of hit songs that have captured the hearts of millions worldwide. His music transcends borders, and his impact on the music industry is undeniable. Whether he's delivering sultry love songs or high-energy dance tracks, Tarkan continues to enchant listeners with his unparalleled artistry and musical innovation.
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

export default Tarkan;