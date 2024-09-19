import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const JackieWilson = () => {
  const songs = [
    {
      title: "Danny Boy",
      year: 1965,
      description: "\"Danny Boy\" is often considered a poignant and heartfelt ode, expressing themes of love, loss, and the bittersweet nature of farewell. The song's protagonist, often referred to as \"Danny,\" is urged to rest in peace and assured of enduring love and remembrance. The haunting melody and lyrical depth contribute to the song's universal appeal and its ability to evoke strong emotions. Jackie Wilson's rendition of this classic showcases his remarkable vocal range and emotional depth.",
      youtubeEmbed: "jCr8QFi7rzU"
    },
    {
      title: "(Your Love Keeps Lifting Me) Higher and Higher",
      year: 1967,
      description: "\"(Your Love Keeps Lifting Me) Higher and Higher\" is an enduring R&B classic, penned by Gary Jackson, Raynard Miner, and Carl Smith. The song found its definitive voice through the remarkable Jackie Wilson, who recorded it for his 1967 album titled \"Higher and Higher,\" produced by the talented Carl Davis. The track's infectious energy and Wilson's soulful delivery propelled it to become a Top 10 pop hit and secured the number one position on the R&B charts.",
      youtubeEmbed: "mzDVaKRApcg"
    },
    {
      title: "Reet Petite",
      year: 1957,
      description: "\"Reet Petite (The Sweetest Girl in Town)\" stands as a timeless classic, not only for Jackie Wilson but also in the broader landscape of popular music. Written by the talented trio of Berry Gordy, Billy Davis, and Gwen Gordy Fuqua, the song became a sensational hit when Jackie Wilson recorded it in 1957 for the Brunswick label. This marked a significant milestone in Wilson's career, establishing him as a solo artist after his time with the Dominoes.",
      youtubeEmbed: "tE46zm4yjhA"
    },
    {
      title: "Baby Workout",
      year: 1965,
      description: "\"Baby Workout\" is a lively R&B tune with an infectious beat that encourages dancing and movement. It was released in 1965. The combination of Wilson's smooth vocals and his dynamic stage performance made this song a standout in his repertoire. Wilson's performances of this song often featured his signature dance moves and charismatic engagement with the audience, as he was known for being a master showman.",
      youtubeEmbed: "sBa81YSyshk"
    },
    {
      title: "Lonely Teardrops",
      year: 1958,
      description: "\"Lonely Teardrops,\" a classic R&B hit, was penned by a talented trio, Berry Gordy Jr., Gwen Gordy, and Roquel \"Billy\" Davis. This emotionally charged song found its powerful voice through the legendary R&B singer, Jackie Wilson, who recorded and released it as a single in 1958 under the Brunswick label. The song swiftly became a commercial success, reaching the top ten on the Billboard Hot 100 chart and securing the number-one spot on the R&B chart. Its enduring popularity is evident from its ranking as the 57th biggest U.S. hit of 1959.",
      youtubeEmbed: "J9vG5BhOKaY"
    },
    {
      title: "Doggin' Around",
      year: 1960,
      description: "\"Doggin' Around,\" written by Lena Agree and originally performed by Jackie Wilson in 1960, is a standout Rhythm and Blues classic. This song achieved significant success, making its mark on both the R&B and pop singles charts in the United States. Notably, \"Doggin' Around\" claimed the top spot on the Hot R&B Sides chart for three consecutive weeks, attesting to its popularity within the R&B genre. It also reached number fifteen on the Billboard Hot 100, crossing over into the pop charts.",
      youtubeEmbed: "8m-euOarB0k"
    },
    {
      title: "To Be Loved",
      year: 1957,
      description: "\"To Be Loved\" is a classic song performed by Jackie Wilson, known for its passionate and heartfelt delivery. The song was released in 1957 and became one of Wilson's early hits, helping to establish his reputation as a powerful and emotive vocalist. \"To Be Loved\" showcases Wilson's remarkable ability to convey deep emotion through his music, and it remains a treasured part of his extensive musical catalog. The song's enduring appeal has made it a favorite among fans of R&B and soul music.",
      youtubeEmbed: "g17y5bBpGmQ"
    },
    {
      title: "That's Why (I Love You So)",
      year: 1959,
      description: "\"That's Why (I Love You So)\" is a timeless classic, penned by the legendary Berry Gordy Jr. and Tyran Carlo, and delivered with heart and soul by the incomparable Jackie Wilson. Released in 1959, this soulful ballad left an indelible mark on the music charts and the hearts of its listeners. The song's emotional depth and Jackie Wilson's impeccable vocal performance propelled it to the #2 spot on the U.S. R&B chart and #13 on the U.S. pop chart, demonstrating the song's widespread appeal and resonance. Included in Wilson's 1959 album \"Lonely Teardrops,\" this track remains a standout for its heartfelt lyrics and the raw, emotive power of Wilson's singing.",
      youtubeEmbed: "9POh4ATtuBw"
    },
    {
      title: "I Get the Sweetest Feeling",
      year: 1968,
      description: "\"I Get the Sweetest Feeling\" is a Motown-inspired gem from Jackie Wilson's prolific Chicago period when he experienced a resurgence of energy and creativity. The song, composed by Van McCoy and Alicia Evelyn, is a testament to Wilson's enduring musical talent and ability to captivate audiences with his signature soulful sound. With the instrumental track performed by Motown's renowned in-house band, the Funk Brothers, and the melodious background vocals provided by The Andantes, the song is a harmonious blend of exceptional musicianship and heartfelt lyrics. Jackie Wilson's velvety vocals bring the song to life, exuding the sheer delight and bliss of being in love. \"I Get the Sweetest Feeling\" remains a timeless classic that exemplifies the magic of Motown-inspired music and Jackie Wilson's ability to connect with listeners on a profound emotional level, making it a cherished piece of soul music history.",
      youtubeEmbed: "eDB85BBV1uA"
    },
    {
      title: "I'll Be Satisfied",
      year: 1959,
      description: "\"I'll Be Satisfied\" is an iconic song by Jackie Wilson, known for its soulful and emotionally charged delivery. With Wilson's powerful vocals and heartfelt lyrics, the song captures the essence of yearning and the longing for love. It has remained a timeless classic, emblematic of his contribution to the world of soul and R&B music.",
      youtubeEmbed: "J8asLnRnKDQ"
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
          <h1 className="text-4xl font-bold mb-4">Jackie Wilson</h1>
          <p className="text-xl mb-8">
            Jackie Wilson, often referred to as "Mr. Excitement," was a trailblazing American singer and performer who left an indelible mark on the music industry. Born on June 9, 1934, he rose to fame during the 1950s and 1960s, becoming a prominent figure in the evolution of rhythm and blues into the vibrant world of soul music. Wilson's electrifying stage presence, charismatic showmanship, and remarkable vocal talents set him apart as one of the most dynamic entertainers in the history of soul, R&B, and rock and roll. His remarkable career as a solo artist, following his time with Billy Ward and His Dominoes, resulted in over 50 chart-topping singles that spanned multiple music genres, including R&B, rock 'n' roll, soul, doo-wop, and easy listening.
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

export default JackieWilson;